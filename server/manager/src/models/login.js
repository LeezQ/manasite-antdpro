import { routerRedux } from 'dva/router';
import { accountLogin, transServerJson } from '../services/api';
import { setAuthority, setToken } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  /*
  reducers 处理数据, 尽量只做state的数据返回 而不要在这里写相关的逻辑
  effects 接收数据
  subscriptions 监听数据
  */
  effects: {
    *login({ payload }, { call, put }) {
      let response = yield call(accountLogin, payload);
      response.currentAuthority = (response.status == 'ok') ? 'admin': 'guest';
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      // Login successfully
      if (response.status == 'ok') {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      setToken(payload.data.token);
      return {
        ...state,
        status: payload.status,
        type: payload.type
      };
    },
  },
};
