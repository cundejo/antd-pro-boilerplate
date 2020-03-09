import { getFakeTodos } from '@/services/todo';

const UserModel = {
  namespace: 'todo',

  state: {
    todos: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getFakeTodos);
      yield put({
        type: 'fetchedTodos',
        payload: response,
      });
    },
  },

  reducers: {
    fetchedTodos(state, action) {
      return { ...state, todos: action.payload.data };
    },
  },
};
export default UserModel;
