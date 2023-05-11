import { useSyncExternalStore } from "react";

const subscribe = (listener: () => void) => {
    global.window?.addEventListener("scroll", listener);
    return () => {
        global.window?.removeEventListener("scroll", listener);
    }
}

const getSnapshot = () => {
    return global.window?.scrollY
}

export const useScrollY = () => useSyncExternalStore(subscribe, getSnapshot);