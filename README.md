# iris_state_model
React驱动状态模型（照搬redux api= =），当然你也可以单独用state-model中的createStore创建一个自己的模型

# 食用方式：
```
import { createStore } from 'iris-state-model';
import { useStore } from 'iris-model-with-react';

let initState = {
  counter: {
    count: 0
  }
}
const _store = createStore<typeof initState>(initState);

const App = () => {
  const { useSelector, useDispatch, useSyncSelector, useDispatch } = useStore(_store);
  
  const num = useSelector<number>((state) => state.counter.count);
  const num_sync = useSyncSelector<number>((state) => state.counter.count);
  
  const dispatch = useDispatch();
  const dispatch_sync = useSyncDispatch();

  return (
    <>
      <button onClick={() => {
        dispatch({ counter: { count: Math.random() } });
      }}
      >ChangeNumber with dispatch</button>
      
      <button onClick={() => {
        dispatch_sync({ counter: { count: Math.random() } });
      }}
      >ChangeNumber with sync</button>
      ------
      {num}
      {num_sync}
    </>
  )
}
export default App;
```

# Todo
0.2.0 - 调整export结构，支持useSyncStore（在react reconcile层面不可打断， 保持状态的连贯性）   
1.0.0 - 面向对象编程，弃用createStore，全面拥抱class

