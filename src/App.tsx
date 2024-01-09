import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

type ItemType = {
  id: number;
  name: string;
};

function RightSide({
  rightItems,
  setRightItems,
}: {
  rightItems: ItemType[];
  setRightItems: React.Dispatch<React.SetStateAction<Partial<ItemType>[]>>;
}) {
  return (
    <ReactSortable
      group={{
        name: 'grouping',
        pull: false,
        put: true,
      }}
      tag="ul"
      list={rightItems}
      setList={setRightItems}
      style={{ marginLeft: '20px', border: '1px solid #ccc' }}
      onAdd={(evt) => {
        console.log(evt.newDraggableIndex);
      }}
    >
      {rightItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ReactSortable>
  );
}

function LeftSide({
  leftItems,
  setLeftItems,
}: {
  leftItems: ItemType[];
  setLeftItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
}) {
  return (
    <ReactSortable
      group={{
        name: 'grouping',
        pull: 'clone' as const,
        put: false,
      }}
      tag="ul"
      list={leftItems}
      setList={setLeftItems}
      // onEnd={(evt) => {
      //   console.log(evt.oldIndex, evt.newIndex);
      // }}
    >
      {leftItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ReactSortable>
  );
}

function BasicFunction(): JSX.Element {
  const [state, setState] = useState<ItemType[]>([
    { id: 1, name: 'shrek' },
    { id: 2, name: 'fiona' },
  ]);

  return (
    <ReactSortable list={state} setList={setState}>
      {state.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </ReactSortable>
  );
}

function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  const [leftItems, setLeftItems] = useState<ItemType[]>([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ]);
  const [rightItems, setRightItems] = useState([
    { id: 4, name: 'Item 4', info: 'info4' },
    { id: 5, name: 'Item 5', info: 'info4' },
    { id: 6, name: 'Item 6', info: 'info4' },
  ]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <LeftSide leftItems={leftItems} setLeftItems={setLeftItems} />
        <RightSide rightItems={rightItems} setRightItems={setRightItems} />
      </div>

      <BasicFunction />
      <h1>Vite + React</h1>

      <div className="card">
        <button
          type="button"
          onClick={() => setCount((prevCount) => prevCount + 1)}
        >
          <span>count is </span>
          {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
