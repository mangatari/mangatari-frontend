interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_KEY: string;
  readonly VITE_API_URL?: string; // optional if you use this
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}