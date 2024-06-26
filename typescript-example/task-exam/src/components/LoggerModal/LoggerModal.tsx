import { Dispatch, SetStateAction } from 'react';
import { useTypedSelector } from '../../hooks/redux';
import { FiX } from 'react-icons/fi';
import LogItem from './LogItem/LogItem';
import {
  wrapper,
  modalWindow,
  header,
  title,
  closeButton,
  body,
} from './LoggerModal.css';

type TLoggerModalProps = {
  setIsLoggerOpen: Dispatch<SetStateAction<boolean>>;
};
export default function LoggerModal({ setIsLoggerOpen }: TLoggerModalProps) {
  const logs = useTypedSelector((state) => state.logger.logArray);

  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>활동 기록</div>
          <FiX className={closeButton} onClick={() => setIsLoggerOpen(false)} />
        </div>
        <div className={body}>
          {logs.map((log) => (
            <LogItem key={log.logId} logItem={log} />
          ))}
        </div>
      </div>
    </div>
  );
}
