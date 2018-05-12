import request from '../utils/request';

export async function accountLogin(params) {
    return request('/api/users/login/admin', {
        method: 'POST',
        body: params,
    });
}

export async function queryNotices() {
    return request('/api/notices');
}

export async function query(params) {
  return request('/api/users', {
    method: 'GET',
    ...params
  });
}

export async function queryCurrent() {
  return request('/api/users/current');
}

export async function disableUsers(params) {
  return request('/api/users/freeze', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
