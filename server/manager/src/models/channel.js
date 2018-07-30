import { getChannelList, addChannel, updateChannel, deleteChannel } from '../services/channel';

export default {
  namespace: 'channel',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload = { page: 1 } }, { call, put }) {
      const response = yield call(getChannelList, payload);
      yield put({
        type: 'save',
        payload: { list: response.data, pagination: { total: 100, current: payload.page } },
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addChannel, payload);
      console.log('add function response-', response);
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateChannel, payload, payload.id);
      console.log('add function response-', response);
      if (callback) callback();
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteChannel, payload.id);
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
