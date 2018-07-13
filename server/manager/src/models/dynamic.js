//import * as services from '../services/financial'
import { notification } from 'antd';

export default {
    namespace: 'dynamic',

    state: {
        data:{
            list:[],
            pagination:{
            },
        },
    },

    effects: {
        // 收费记录
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
