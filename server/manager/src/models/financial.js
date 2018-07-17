import * as services from '../services/financial'
import { notification } from 'antd';

export default {
    namespace: 'financial',

    state: {
        data:{
            list:[],
            pagination:{
            },
        },
    },

    effects: {
        // 收费记录
        *charges({ payload }, { call, put }) {
            const response = yield call(services.chargesData, payload);
            yield put({
              type: 'save',
              payload: response.data,
            });
          },
        // 押金流水
          *deposits({ payload }, { call, put }) {
            const response = yield call(services.depositsData, payload);
            yield put({
              type: 'save',
              payload: response.data,
            });
          },
        // 充值记录
          *recharge({ payload }, { call, put }) {
            const response = yield call(services.payrecordsData, payload);
            yield put({
              type: 'save',
              payload: response.data,
            });
          },
        // 提现记录
          *present({ payload }, { call, put }) {
            const response = yield call(services.payrecordsData, payload);
            yield put({
              type: 'save',
              payload: response.data,
            });
          },
          *statSum({ payload }, { call, put }) {
            const response = yield call(services.financialStat, payload);
            yield put({
              type: 'stat',
              payload: response.data,
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
        stat(state, action) {
            console.log('--stat--',action.payload)
            return {
              ...state,
              stat: action.payload,
            };
        },
    },
}
