import { ChangeEvent, Dispatch, RefObject, useState } from 'react';
import { SetStateAction } from 'react';
import { FiCheck } from 'react-icons/fi';
import { sideForm, input, icon } from './SideForm.css';
import { addBoard } from '../../../store/slices/boardsSlice';
import { addLog } from '../../../store/slices/loggerSlice';
import { useTypedDispatch } from '../../../hooks/redux';
import { v4 } from 'uuid';

type TSideFormProps = {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  inputRef: RefObject<HTMLInputElement>;
};

export default function SideForm({ setIsFormOpen, inputRef }: TSideFormProps) {
  const [inputText, setInputText] = useState('');
  const dispatch = useTypedDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleOnBlur = () => {
    setIsFormOpen(false);
  };

  const handleClick = () => {
    if (inputText) {
      dispatch(
        addBoard({
          board: { boardId: v4(), boardName: inputText, lists: [] },
        })
      );
      dispatch(
        addLog({
          logId: v4(),
          logMessage: `게시판 등록 : ${inputText}`,
          logAuthor: 'User',
          logTimestamp: String(Date.now()),
        })
      );
    }
  };

  return (
    <div className={sideForm}>
      <input
        // autoFocus
        className={input}
        ref={inputRef}
        type="text"
        placeholder="새로운 게시판 등록하기"
        value={inputText}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
      <FiCheck className={icon} onMouseDown={handleClick} />
    </div>
  );
}
