import request from '../utils/request';

export async function accountLogin(params){
  return request('/api/users/login/admin',{
    method:'POST',
    body:params
  });
}

export async function queryNotices() {
    return request('/api/notices');
}

export async function getUsersList(){
  return request('/api/users')
}

export async function freeze(params){
  return request('/api/users/freeze',{
    method:'POST', 
    body:params
  })
}