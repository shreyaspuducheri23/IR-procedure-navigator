/** Short git SHA of the build, injected by `define` in vite.config.ts. "dev" locally. */
declare const __APP_VERSION__: string;

interface ImportMetaEnv {
  /**
   * URL of the Cloudflare Worker that files feedback as a GitHub issue. When
   * unset, the app falls back to opening GitHub's prefilled new-issue page.
   */
  readonly VITE_FEEDBACK_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
