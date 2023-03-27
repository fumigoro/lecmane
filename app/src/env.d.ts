/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LIFF_ID?: string;
  readonly VITE_FIREBASE_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
