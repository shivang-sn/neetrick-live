"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function Toast({
  show,
  heading,
  message,
  onClose,
}: {
  show: boolean;
  heading: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -16, x: 16 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -16, x: 16 }}
          transition={{ duration: 0.4, ease: [0.2, 1, 0.3, 1] }}
          role="status"
          aria-live="polite"
          className="fixed right-4 top-20 z-[60] w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-line bg-surface/95 p-5 shadow-2xl backdrop-blur-xl md:right-6 md:top-24"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="display text-lg text-accent">{heading}</div>
              <p className="mt-1 text-sm text-muted">{message}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss notification"
              data-cursor="link"
              className="shrink-0 text-muted transition-colors hover:text-text"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
