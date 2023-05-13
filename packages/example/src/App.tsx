import { useStore } from 'iris-model-with-react';
import { StateModel } from 'iris-state-model';

let initState = {
  counter: {
    count: 0
  }
};

let i = 0;

const _store = new StateModel(initState);

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