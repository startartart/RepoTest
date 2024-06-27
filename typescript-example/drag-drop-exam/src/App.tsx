import { useState } from 'react';
import './App.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import type { DropResult, ResponderProvided } from 'react-beautiful-dnd';
const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Good speed',
  },
  {
    id: 'cato',
    name: 'Little Cato',
  },
  {
    id: 'PBG',
    name: 'pbg',
  },
];
export default function App() {
  const [characters, setCharacters] = useState(finalSpaceCharacters);

  const handleEnd = (result: DropResult, provided: ResponderProvided) => {
    if (!result.destination) return;

    const items = Array.from(characters);

    const [reorderItem] = items.splice(0, 1);

    items.splice(result.destination.index, 0, reorderItem);
    setCharacters(items);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters.map(({ id, name }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <p>{name}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}
