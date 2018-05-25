import {getDiscover,deletDiscover} from '../services/user'

export default {

    namespace: 'discover',
    state: {
        data:{ 
          list: [],
          pagination: {  
          },
        }, 
      },
    effects: {
        *fetch({ payload }, { call, put }) { 
          const response = yield call(getDiscover, payload);   
          yield put({
            type: 'save',
            payload: response.data,
          });
        }, 
        *deletDiscover({ payload,callback}, { call, put }){
            const response =yield call(deletDiscover,payload);
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
}