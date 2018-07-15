import {getExchangeList,getActivityList,getShareList} from '../services/dynamic'

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

        *fetchActivity({ payload }, { call, put }) {
          const response = yield call(getActivityList, payload);
          yield put({
            type: 'save',
            payload:{list:response.data,pagination:{total:100,current:1}}
          });
        },

        *fetchShare({ payload }, { call, put }) {
          const response = yield call(getShareList, payload);
          yield put({
            type: 'save',
            payload:{list:response.data,pagination:{total:100,current:1}}
          });
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
    },
}
