import { createStore } from 'iris-state-model';
import { useStore } from 'iris-model-with-react'

let initState = {
  counter: {
    count: 0
  }
};

let i = 0;

// 这儿实际上是实例化，可以用class替代
const _store = createStore<typeof initState>(initState);

const App = () => {
  const { useSelector, useDispatch } = useStore(_store);
  // @ts-ignore
  const num = useSelector<number>((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => {
        dispatch({ counter: { count: ++i } });
      }}
      >ChangeNumber with dispatch</button>
      {num}
    </>
  )
}
export default App;