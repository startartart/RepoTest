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
  boardId,
  id,
}: TTaskProps) {
  return (
    <div className={container}>
      <div className={title}>{taskName}</div>
      <div className={body}>{taskDescription}</div>
    </div>
  );
}
