type Listener = () => void;


export type StoreApis<TState> = {
  // 获取状态快照
  getState(): TState,
  // 订阅器
  subscribe(listener: Listener): () => void,
  // 执行器，调用后会触发所有订阅器
  setState(newState: TState | Partial<TState>): void
}

type StoreCreator = <TState>(initState: TState) => StoreApis<TState>

/**
 * @deprecated
 * use createStore instead
 */
export const createStore: StoreCreator = (initState) => {
  type State = typeof initState

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
    listeners.forEach(l => l());
  }
  return { getState, subscribe, setState }
};

export class StateModel<TState> {
  public state: TState
  private listener: Set<Listener>

  constructor(state: TState) {
    this.state = state;
    this.listener = new Set();
  }

  getState() {
    return this.state;
  }

  subscribe(listener: Listener) {
    this.listener.add(listener);
    return () => {
      this.listener.delete(listener);
    }
  }

  setState(payload: Partial<TState>) {
    const nextState = { ...this.state, ...payload };
    this.state = nextState;
    this.listener.forEach(l => l())
  }
}