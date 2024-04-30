const HELLO_WORLD_TOAST = 'Hello, World';
const NOT_FOUND_TOAST = '뉴튜버 정보를 찾을 수 없습니다.';
const EMPTY_NEWTUBER_TOAST = '등록된 뉴튜버가 없습니다.';
const SIGN_UP_TOAST = (channelTitle, idx) =>
  `${channelTitle}님은 ${idx}번째 뉴튜버입니다.`;
const DELETE_NEWTUBER_TOAST = (channelTitle) =>
  `${channelTitle}의 뉴튜브 채널이 삭제되었습니다.`;
const DELETE_ALL_NEWTUBER_TOAST = '모든 뉴튜버가 삭제되었습니다.';
const CHANGE_NETUBE_CHANNEL_TOAST = (preTitle, changeTitle) =>
  `${preTitle}의 뉴튜브 채널명이 ${changeTitle}로 변경 되었습니다.`;

module.exports = {
  HELLO_WORLD_TOAST,
  NOT_FOUND_TOAST,
  EMPTY_NEWTUBER_TOAST,
  SIGN_UP_TOAST,
  DELETE_NEWTUBER_TOAST,
  DELETE_ALL_NEWTUBER_TOAST,
  CHANGE_NETUBE_CHANNEL_TOAST,
};
