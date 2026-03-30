import { useCallback } from "react";

const isSupported = typeof window !== "undefined" && "Notification" in window;

export function useNotifications() {
  const requestPermission = useCallback(async () => {
    if (!isSupported) return "denied";
    if (Notification.permission !== "default") return Notification.permission;
    return await Notification.requestPermission();
  }, []);

  const notify = useCallback(
    async (title, options = {}) => {
      if (!isSupported) return;
      const permission = await requestPermission();
      if (permission !== "granted") return;
      new Notification(title, { icon: "/favicon.svg", ...options });
    },
    [requestPermission]
  );

  return { notify };
}
