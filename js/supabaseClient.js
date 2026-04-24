// KiwiNest v2에서는 Supabase를 아직 연결하지 않습니다.
// 나중에 Hazel님이 직접 붙일 수 있도록 자리를 남겨 둔 파일입니다.
// 예시:
// import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const supabase = null;

export async function syncToSupabase() {
  throw new Error("Supabase sync is not configured yet.");
}

export async function loadFromSupabase() {
  throw new Error("Supabase sync is not configured yet.");
}
