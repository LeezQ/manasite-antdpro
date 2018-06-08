import * as services from '../services/system'
import { notification } from 'antd';


export default {
    namespace: 'system',
    state: {
        data:{
            list:[],
            pagination:{  
            },
        },
    },


    effects: { 
        *roles({ payload }, { call, put }) {  
            const response=yield call(services.roles, payload);    
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