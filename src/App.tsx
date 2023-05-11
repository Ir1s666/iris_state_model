import { createPortal } from 'react-dom';
import { useScrollY, useOnline } from './hooks';

const ScrollY = () => {
  const scrollY = useScrollY();
  return <div>{scrollY}</div>;
}

const App = () => {
  const isOnline = useOnline();
  return (
    <>
      {isOnline ? (
        <div>
          {Array.from({ length: 100 }).map((_, index) => {
            return (
              <p key={index}>占位符</p>
            )
          })}
          <div style={{ position: 'fixed', bottom: '0px', right: '0px' }}>
            <ScrollY />
          </div>
        </div>) : createPortal(<div>离线了～～～</div>, document.body) }
    </>
  )
}
export default App;