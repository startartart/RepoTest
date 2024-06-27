import { userReducer } from '../slices/userSlice';
import { boardsReducer } from '../slices/boardsSlice';
import { loggerReducer } from '../slices/loggerSlice';
import { modalReducer } from '../slices/modalSlice';

const reducer = {
  logger: loggerReducer,
  boards: boardsReducer,
  modal: modalReducer,
  user: userReducer,
};

export default reducer;
