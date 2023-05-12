import { createStore } from 'iris-state-model';
import { useStore, useSyncStore } from 'iris-model-with-react'

let initState = {
  counter: {
    count: 0
  }
}

let initState2 = {
  counter: {
    count: 0
  }
}

let i = 0;

// 这儿实际上是实例化，可以用class替代
const _store = createStore<typeof initState>(initState);
const _store2 = createStore<typeof initState2>(initState2);

const App = () => {
  const { useSelector, useDispatch } = useStore(_store);
  const { useSyncSelector, useSyncDispatch } = useSyncStore(_store2);
  // @ts-ignore
  const num = useSelector<number>((state) => state.counter.count);
  const dispatch = useDispatch();

  const num2 = useSyncSelector<number>((state) => state.counter.count);
  const dispatch2 = useSyncDispatch();

  return (
    <>
      <button onClick={() => {
        dispatch({ counter: { count: Math.random() } });
      }}
      >ChangeNumber with dispatch</button>
      {num}
      -------------------------------
      <button onClick={() => {
        dispatch2({ counter: { count: Math.random() } });
      }}>ChangeNumber with syncDispatch</button>
      {num2}
    </>
  )
}
export default App;