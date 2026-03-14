import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const DEFAULT_TABLE_NAME = "shared_workspaces";
let supabaseClient = null;

export function GET() {
  return jsonResponse({
    success: true,
    message: "POST で connect / fetch / saveSnapshot を送ると、物件一覧と準備リストの共有ワークスペースを操作できます。",
    configured: hasSupabaseConfig(),
  });
}

export async function POST(request) {
  let body = null;

  try {
    body = await request.json();
  } catch (error) {
    return jsonResponse(
      {
        success: false,
        message: "共有設定の送信データを読めませんでした。",
        reason: "invalid-json",
      },
      400
    );
  }

  if (!hasSupabaseConfig()) {
    return jsonResponse(
      {
        success: false,
        message:
          "共有保存先がまだ設定されていません。Vercel の環境変数に SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を設定してください。",
        reason: "supabase-not-configured",
      },
      503
    );
  }

  const action = cleanText(body?.action);
  const workspace = normalizeWorkspaceSlug(body?.workspace);
  const passphrase = cleanText(body?.passphrase);

  if (!action) {
    return jsonResponse(
      {
        success: false,
        message: "共有APIの action が空です。",
        reason: "missing-action",
      },
      400
    );
  }

  if (!workspace) {
    return jsonResponse(
      {
        success: false,
        message: "共有ワークスペース名を入力してください。",
        reason: "missing-workspace",
      },
      400
    );
  }

  if (!passphrase) {
    return jsonResponse(
      {
        success: false,
        message: "共有の合言葉を入力してください。",
        reason: "missing-passphrase",
      },
      400
    );
  }

  const supabase = getSupabaseClient();

  try {
    if (action === "connect") {
      return await handleConnect(
        supabase,
        workspace,
        passphrase,
        body?.seedProperties,
        body?.seedPreparationItems
      );
    }

    if (action === "fetch") {
      return await handleFetch(supabase, workspace, passphrase);
    }

    if (action === "saveSnapshot") {
      return await handleSaveSnapshot(
        supabase,
        workspace,
        passphrase,
        body?.properties,
        body?.preparationItems,
        body?.clientRevision
      );
    }

    return jsonResponse(
      {
        success: false,
        message: `未対応の action です: ${action}`,
        reason: "unsupported-action",
      },
      400
    );
  } catch (error) {
    return jsonResponse(
      {
        success: false,
        message: buildServerErrorMessage(error),
        reason: error?.reason || "unexpected-server-error",
      },
      error?.statusCode || 500
    );
  }
}

async function handleConnect(supabase, workspace, passphrase, seedProperties, seedPreparationItems) {
  const accessHash = hashPassphrase(passphrase);
  const row = await findWorkspaceRow(supabase, workspace);

  if (!row) {
    const initialProperties = normalizePropertiesArray(seedProperties);
    const initialPreparationItems = normalizePreparationItemsArray(seedPreparationItems);
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from(getTableName())
      .insert({
        slug: workspace,
        access_hash: accessHash,
        properties: initialProperties,
        preparation_items: initialPreparationItems,
        revision: 1,
        created_at: now,
        updated_at: now,
      })
      .select("slug, properties, preparation_items, revision, updated_at")
      .single();

    if (error) {
      throw toServerError(error, "workspace-create-failed");
    }

    return jsonResponse({
      success: true,
      created: true,
      message: "共有ワークスペースを作成しました。以後は 2 台で同じ物件一覧と準備リストを見られます。",
      workspace,
      properties: normalizePropertiesArray(data?.properties),
      preparationItems: normalizePreparationItemsArray(data?.preparation_items),
      revision: Number(data?.revision || 1),
      updatedAt: data?.updated_at || now,
    });
  }

  verifyPassphrase(row, accessHash);

  return jsonResponse({
    success: true,
    created: false,
    message: "共有ワークスペースに接続しました。最新の物件一覧と準備リストを読み込みました。",
    workspace,
    properties: normalizePropertiesArray(row.properties),
    preparationItems: normalizePreparationItemsArray(row.preparation_items),
    revision: Number(row.revision || 0),
    updatedAt: row.updated_at || "",
  });
}

async function handleFetch(supabase, workspace, passphrase) {
  const row = await requireWorkspaceRow(supabase, workspace);
  verifyPassphrase(row, hashPassphrase(passphrase));

  return jsonResponse({
    success: true,
    message: "共有データを更新しました。",
    workspace,
    properties: normalizePropertiesArray(row.properties),
    preparationItems: normalizePreparationItemsArray(row.preparation_items),
    revision: Number(row.revision || 0),
    updatedAt: row.updated_at || "",
  });
}

async function handleSaveSnapshot(supabase, workspace, passphrase, properties, preparationItems, clientRevision) {
  const row = await requireWorkspaceRow(supabase, workspace);
  verifyPassphrase(row, hashPassphrase(passphrase));

  const safeClientRevision = Number(clientRevision);
  const currentRevision = Number(row.revision || 0);

  if (!Number.isFinite(safeClientRevision)) {
    throw createServerError(400, "client-revision-required", "共有保存に必要な revision がありません。");
  }

  if (safeClientRevision !== currentRevision) {
    return jsonResponse(
      {
        success: false,
        message:
          "別の端末で更新が入ったため、共有保存をいったん止めました。最新データを読み直したので、内容を確認してもう一度保存してください。",
        reason: "revision-conflict",
        workspace,
        properties: normalizePropertiesArray(row.properties),
        preparationItems: normalizePreparationItemsArray(row.preparation_items),
        revision: currentRevision,
        updatedAt: row.updated_at || "",
      },
      409
    );
  }

  const nextProperties = normalizePropertiesArray(properties);
  const nextPreparationItems = normalizePreparationItemsArray(preparationItems);
  const nextRevision = currentRevision + 1;
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from(getTableName())
    .update({
      properties: nextProperties,
      preparation_items: nextPreparationItems,
      revision: nextRevision,
      updated_at: now,
    })
    .eq("slug", workspace)
    .select("slug, properties, preparation_items, revision, updated_at")
    .single();

  if (error) {
    throw toServerError(error, "workspace-save-failed");
  }

  return jsonResponse({
    success: true,
    message: "共有データを保存しました。",
    workspace,
    properties: normalizePropertiesArray(data?.properties),
    preparationItems: normalizePreparationItemsArray(data?.preparation_items),
    revision: Number(data?.revision || nextRevision),
    updatedAt: data?.updated_at || now,
  });
}

async function findWorkspaceRow(supabase, workspace) {
  const { data, error } = await supabase
    .from(getTableName())
    .select("slug, access_hash, properties, preparation_items, revision, updated_at")
    .eq("slug", workspace)
    .maybeSingle();

  if (error) {
    throw toServerError(error, "workspace-fetch-failed");
  }

  return data || null;
}

async function requireWorkspaceRow(supabase, workspace) {
  const row = await findWorkspaceRow(supabase, workspace);
  if (!row) {
    throw createServerError(
      404,
      "workspace-not-found",
      "共有ワークスペースが見つかりません。最初の端末で設定を保存し直して作成してください。"
    );
  }

  return row;
}

function verifyPassphrase(row, accessHash) {
  if (row.access_hash !== accessHash) {
    throw createServerError(401, "invalid-passphrase", "合言葉が違います。共有設定を確認してください。");
  }
}

function hasSupabaseConfig() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return supabaseClient;
}

function getTableName() {
  return process.env.SUPABASE_SHARED_TABLE || DEFAULT_TABLE_NAME;
}

function hashPassphrase(passphrase) {
  return crypto.createHash("sha256").update(passphrase).digest("hex");
}

function normalizeWorkspaceSlug(value) {
  const cleaned = cleanText(value)
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");

  return cleaned.slice(0, 64);
}

function normalizePropertiesArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizePreparationItemsArray(value) {
  return Array.isArray(value) ? value : [];
}

function buildServerErrorMessage(error) {
  if (error?.friendlyMessage) {
    return error.friendlyMessage;
  }

  return "共有データの処理中に予期しないエラーが起きました。時間をおいてもう一度試してください。";
}

function toServerError(error, reason) {
  return createServerError(500, reason, "共有保存先との通信に失敗しました。");
}

function createServerError(statusCode, reason, friendlyMessage) {
  const error = new Error(friendlyMessage);
  error.statusCode = statusCode;
  error.reason = reason;
  error.friendlyMessage = friendlyMessage;
  return error;
}

function jsonResponse(payload, status = 200) {
  return Response.json(payload, {
    status,
    headers: {
      "cache-control": "no-store",
    },
  });
}

function cleanText(value) {
  return typeof value === "string" ? value.trim() : value == null ? "" : String(value).trim();
}
