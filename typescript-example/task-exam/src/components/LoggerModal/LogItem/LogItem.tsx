import { BsFillPersonFill } from 'react-icons/bs';
import { ILogItem } from '../../../types';
import { logItemWrap, message, author, date } from './LogItem.css';

type TLogItemProps = {
  logItem: ILogItem;
};

export default function LogItem({ logItem }: TLogItemProps) {
  const timeOffset = new Date(Date.now() - Number(logItem.logTimestamp));

  const showOffsetTime = `
  ${timeOffset.getMinutes() > 0 ? `${timeOffset.getMinutes()}m` : ``}
  ${timeOffset.getSeconds() > 0 ? `${timeOffset.getSeconds()}s ago` : ``}
  ${timeOffset.getSeconds() === 0 ? `just now` : ``}
  `;
  return (
    <div className={logItemWrap}>
      <div className={author}>
        <BsFillPersonFill />
        {logItem.logAuthor}
      </div>
      <div className={message}>{logItem.logMessage}</div>
      <div className={date}>{showOffsetTime}</div>
    </div>
  );
}
