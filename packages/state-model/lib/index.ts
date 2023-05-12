type Listener<T> = (nextState: T, currentState: T) => void;


export type StoreApis<TState> = {
  // 获取状态快照
  getState(): TState,
  // 订阅器
  subscribe(listener: Listener<TState>): () => void,
  // 执行器，调用后会触发所有订阅器
  setState(newState: TState | Partial<TState>): void
}

type StoreCreator = <TState>(initState: TState) => StoreApis<TState>

export const createStore: StoreCreator = (initState) => {
  type State = typeof initState
  type Listener = (nextState: State, currentState: State) => void;

  let state = initState;
  const getState = () => state;
  const listeners = new Set<Listener>();

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener)
    }
  }

  const setState = (payload: State | Partial<State>) => {
    const nextState = { ...state, ...payload } as State
    state = nextState;
    listeners.forEach(l => l(nextState, state));
  }
  return { getState, subscribe, setState }
};