import {userFollowData} from '../services/user'

export default {
    namespace: 'follow',
  
    state: { 
        data:{},
    },

    effects: {
        *fetch({ payload }, { call, put }) { 
            console.log('----param---is',payload)
            const response = yield call(userFollowData, payload);  
            console.log('get----user---friends--',response.data)
            yield put({
                type: 'save',
                payload: response.data,
              });
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
}