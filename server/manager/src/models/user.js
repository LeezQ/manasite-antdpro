import {
  getUsersList,
  getUserInfo,
  getUserCredit,
  freeze} from '../services/user'

export default {
  namespace: 'user',

  state: {
    data:{ 
      list: [],
      pagination: {  
      },
    },
    currentUser:{}, 
    stats:{}, 
  },
  effects: {
    *fetch({ payload }, { call, put }) { 
      const response = yield call(getUsersList, payload);   
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *freeze({ payload, callback }, { call, put }) { 
      const response = yield call(freeze, payload);  
      if (callback) callback();
    },
    *info({ payload},{call,put}){   
      const response=yield call(getUserInfo,payload)   
      const stats=yield call(getUserCredit,payload) 
      yield put({
        type:'current',
        payload:{
          currentUser:response.data,
          stats:stats.data, 
      }})
    },  
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    current(state,action){ 
      return {
        ...state,
        ...action.payload, 
      }
    }, 
  },
};