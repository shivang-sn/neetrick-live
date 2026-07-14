"use client";

import { useEffect } from "react";

// Deters casual right-click / DevTools-shortcut usage. This is NOT real
// protection - anyone can still open DevTools via the browser's own menu,
// remap shortcuts, or disable JS before the page loads - but it blocks the
// common accidental/casual paths (right-click "Inspect", F12, Ctrl/Cmd+Shift+I).
export default function DevToolsGuard() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const mod = e.ctrlKey || e.metaKey; // Ctrl on Windows/Linux, Cmd on Mac

      const blocked =
        key === "F12" ||
        (mod && e.shiftKey && ["I", "J", "C"].includes(key)) || // DevTools / console / element picker
        (mod && key === "U"); // view-source

      if (blocked) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  return null;
}
