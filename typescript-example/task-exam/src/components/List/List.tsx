import { GrSubtract } from 'react-icons/gr';
import Task from '../Task/Task';
import ActionButton from '../ActionButton/ActionButton';
import { IList, ITask } from '../../types';
import { useTypedDispatch } from '../../hooks/redux';
import { deleteList, setModalActive } from '../../store/slices/boardsSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { setModalData } from '../../store/slices/modalSlice';
import { v4 } from 'uuid';
import { listWrapper, name, header, deleteButton } from './List.css';
import { Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';

type TListProps = {
  boardId: string;
  list: IList;
};

export default function List({ list, boardId }: TListProps) {
  const dispatch = useTypedDispatch();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `리스트 삭제하기: ${list.listName}`,
        logAuthor: 'User',
        logTimestamp: String(Date.now()),
      })
    );
  };

  const handleTaskChange = (boardId: string, listId: string, task: ITask) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };

  if (!enabled) return null;
  return (
    <Droppable droppableId={list.listId}>
      {(provided) => (
        <div
          className={listWrapper}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className={header}>
            <div className={name}>{list.listName}</div>
            <GrSubtract
              className={deleteButton}
              onClick={() => handleListDelete(list.listId)}
            />
          </div>
          {list.tasks.map((task, index) => (
            <div
              onClick={() => handleTaskChange(boardId, list.listId, task)}
              key={task.taskId}
            >
              <Task
                taskName={task.taskName}
                taskDescription={task.taskDescription}
                boardId={boardId}
                id={task.taskId}
                index={index}
              />
            </div>
          ))}
          {provided.placeholder}
          <ActionButton boardId={boardId} listId={list.listId} />
        </div>
      )}
    </Droppable>
  );
}
