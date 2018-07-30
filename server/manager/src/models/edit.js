import * as services from '../services/edit'
import { notification } from 'antd';

export default {
    namespace: 'edit',

    state: {
        data:{
            list:[],
            pagination:{
            },
        },
    },

    effects: {
        // 专题
        *subject({ payload }, { call, put }) {
            const response = yield call(services.subjectData, payload);
            yield put({
              type: 'save',
              payload: response.data,
            });
          },
        // 帮助
          *help({ payload }, { call, put }) {
            const response = yield call(services.helpData, payload);
            yield put({
              type: 'save',
              payload: response.data,
            });
          },
          *add({ payload ,callback}, { call, put }) {
            const response = yield call(services.addData, payload);
            if (callback) callback();
          },
          *delete({ payload,callback }, { call, put }) {
            const response = yield call(services.deleteContent, payload);
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
