import type { StoreApis } from 'iris-state-model';
import { useState, useEffect, useSyncExternalStore } from 'react';



export const useStore = <TState>(store: StoreApis<TState>) => {
  const [_, updateStore] = useState<TState>(store.getState());
  useEffect(() => {

    const listener = (newState: Partial<TState>, state: TState) => {
      updateStore({ ...state, ...newState });
    };
    const unSubscribe = store.subscribe(listener);
    return unSubscribe;
  }, [store.getState()]);

  return {
    // FIXME TS
    // 这里的TS有点问题，我不知道返回的层级
    useSelector: <T = Partial<TState>>(selector: (state: TState) => T) => {
      return selector(_)
    },
    useDispatch: () => {
      return (state: TState | Partial<TState>) => {
        store.setState(state)
      }
    }
  }
}

export const useSyncStore = <TState>(store: StoreApis<TState>) => {
  const { subscribe, getState, setState } = store;
  const _ = useSyncExternalStore(subscribe, getState)
  return {
    useSyncSelector: <T = Partial<TState>>(selector: (state: TState) => T) => {
      return selector(_)
    },
    useSyncDispatch: () => {
      return (state: TState | Partial<TState>) => {
        setState(state)
      }
    }
  }
}