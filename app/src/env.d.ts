// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CUSTOM_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}