import type { StoreApis, StateModel } from 'iris-state-model';
import { useState, useEffect, useSyncExternalStore } from 'react';

const useForceUpdate = () => {
  const [_, setState] = useState({});
  return () => setState({});
}

export const useStore = <TState>(store: StoreApis<TState> | StateModel<TState>) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    return store.subscribe(forceUpdate);
  }, [store.getState()]);

  return {
    // FIXME TS
    // 这里的TS有点问题，我不知道返回的层级
    useSelector: <T = Partial<TState>>(selector: (state: TState) => T) => {
      return selector(store.getState())
    },
    useDispatch: () => {
      return (state: TState | Partial<TState>) => {
        store.setState(state)
      }
    }
  }
}

export const useModel = <TState>(store: StateModel<TState>) => {
  const model = useSyncExternalStore(store.subscribe, store.getState);
  
  return model
};