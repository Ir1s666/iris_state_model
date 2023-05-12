export type StoreApis<TState> = {
  // 获取状态快照
  getState(): TState,
  // 订阅器
  subscribe(listener: (prevState: TState, nextState: TState) => void): () => void,
  // 执行器，调用后会触发所有订阅器
  setState(newState: TState | Partial<TState>): void
}

type StoreCreator = <TState>(initState: TState) => StoreApis<TState>

export const createStore: StoreCreator = (initState) => {
  type State = typeof initState
  type Listener = (p: State, n: State) => void;

  let state = initState;
  const getState = () => state;
  const listeners = new Set<Listener>();

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener)
    }
  }

  const setState = (newState: State | Partial<State>) => {
    const pState = state;
    const nState = { ...state, ...newState }
    listeners.forEach(l => l(pState, nState));
    state = nState
  }
  return { getState, subscribe, setState }
};