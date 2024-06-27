import { Draggable } from 'react-beautiful-dnd';
import { container, title, body } from './Task.css';
type TTaskProps = {
  index: number;
  taskName: string;
  taskDescription: string;
  id: string;
  boardId: string;
};

export default function Task({
  index,
  taskName,
  taskDescription,
  id,
}: TTaskProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={container}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div className={title}>{taskName}</div>
          <div className={body}>{taskDescription}</div>
        </div>
      )}
    </Draggable>
  );
}
