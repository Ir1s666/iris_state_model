import { useSyncExternalStore } from "react";

const subscribe = (lintener: () => void) => {
    global.window.addEventListener('online', lintener);
    global.window.addEventListener('offline', lintener);

    return () => {
        global.window.removeEventListener('online', lintener);
        global.window.removeEventListener('offline', lintener);
    }
};

const getSnapshot = () => {
    return navigator.onLine
}

export const useOnline = () => useSyncExternalStore(subscribe, getSnapshot)