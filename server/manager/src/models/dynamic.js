import {
    getExchangeList,
    getActivityList,
    getShareList,
    getComments,
    getExchangeProfile,
    getActivityProfile,
    getShareProfile,
    deleteDynamic,
    deleteComment
  } from '../services/dynamic'

export default {
    namespace: 'dynamic',

    state: {
        data:{
            list:[],
            pagination:{},
        },
    },

    effects: {
        *fetchExchange({ payload }, { call, put }) {
          const response = yield call(getExchangeList, payload);
          yield put({
            type: 'save',
            payload:{list:response.data,pagination:{total:100,current:1}}
          });
        },

        *profileExchange({ payload }, { call, put }) {
          const response = yield call(getExchangeProfile, payload.id);
          yield put({
            type: 'info',
            payload: response.data,
          });
        },

        *fetchActivity({ payload }, { call, put }) {
          const response = yield call(getActivityList, payload);
          yield put({
            type: 'save',
            payload:{list:response.data,pagination:{total:100,current:1}}
          });
        },

        *profileActivity({ payload }, { call, put }) {
          const response = yield call(getActivityProfile, payload.id);
          yield put({
            type: 'info',
            payload: response.data,
          });
        },

        *fetchShare({ payload }, { call, put }) {
          const response = yield call(getShareList, payload);
          yield put({
            type: 'save',
            payload:{list:response.data,pagination:{total:100,current:1}}
          });
        },

        *profileShare({ payload }, { call, put }) {
          const response = yield call(getShareProfile, payload.id);
          yield put({
            type: 'info',
            payload: response.data,
          });
        },

        *fetchComments({ payload }, { call, put }) {
          const response = yield call(getComments, payload);
          yield put({
            type: 'save',
            payload:{list:response.data,pagination:{total:100,current:1}}
          });
        },
        *delete({ payload, callback }, { call, put }) {
          const response = yield call(deleteDynamic, payload);
          if (callback) callback();
        },
        *deleteComment({ payload, callback }, { call, put }) {
          const response = yield call(deleteComment, payload);
          if (callback) callback();
        },

    },

    reducers: {
        save(state, action) {
          console.log('--action--',action.payload)
            return {
              ...state,
              data: action.payload,
            };
          },
        info(state, action) {
            return {
              ...state,
              info: action.payload,
            };
          },
    },
}
