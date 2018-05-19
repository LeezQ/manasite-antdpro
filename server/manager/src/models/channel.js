import {getChannelList,deleteChannel} from '../services/channel'

export default {
  namespace: 'channel',

  state: {
    data:{ 
      list: [],
      pagination: {  
      },
    } 
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('------query--list--data--',payload)
      const response = yield call(getChannelList, payload);   
      yield put({
        type: 'save',
        payload: response.data
      });
    },
    *delete({ payload, callback }, { call, put }) {
      console.log('--freeze---payload----',payload)
      const response = yield call(deleteChannel, payload);   
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    }
  },
};