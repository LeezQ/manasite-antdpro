import {getUsersList,freeze} from '../services/user'

export default {
  namespace: 'user',

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
      const response = yield call(getUsersList, payload);   
      yield put({
        type: 'save',
        payload: response.data
      });
    },
    *freeze({ payload, callback }, { call, put }) {
      console.log('--freeze---payload----',payload)
      const response = yield call(freeze, payload);   
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