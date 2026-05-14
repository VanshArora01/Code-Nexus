"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, onStoreChange: () => void): () => void {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getSnapshot(query: string): boolean {
  return window.matchMedia(query).matches;
}

/**
 * Subscribes to `window.matchMedia(query)`. Safe for SSR: server snapshot is `false`.
 * For mobile-only branches, combine with a short post-mount check if you need to avoid
 * SSR/client mismatch on small viewports.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => subscribe(query, onStoreChange),
    () => getSnapshot(query),
    () => false,
  );
}
