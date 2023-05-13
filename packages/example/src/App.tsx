import { useModel } from 'iris-model-with-react';
import { StateModel } from 'iris-state-model';

class Counter extends StateModel<{ counter: { count: number } }> {
  constructor() {
    super({ counter: { count: 0 } })
  }
};

const counter = new Counter();

const App = () => {
  const { useSelector, useDispatch } = useModel(counter);
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count)

  return (
    <div onClick={() => dispatch({ counter: { count: count + 1 } })}>
      {count}
    </div>
  )
}
export default App;