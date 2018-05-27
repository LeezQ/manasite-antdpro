import request from '../utils/request';

export async function accountLogin(params){
  return request('/api/users/login/admin',{
    method:'POST',
    body:params,
  });
}

export async function queryNotices() {
    return request('/api/notices');
}

export async function getUsersList(){
  return request('/api/users')
}
export async function getUserInfo(param){
  return request(`/api/users/${param}`)
}

export async function getUserCredit(param){
  return request('/api/stats/user',{
    header:{'user_id':param }})
}

export async function updateUserForm(param){
  return request(`/api/users/${param.id}`,{
    method:'POST',
    body:param,
  })
}

export async function freeze(params){
  return request('/api/users/freeze',{
    method:'POST', 
    body:params,
  })
}

export async function getDiscover(param){
  return request('api/discover',{
    method:'GET',
    ...param,
  })
}

export async function deletDiscover(id){
  return request(`api/discover/${id}`,{method:'DELETE'})
}

export async function userFollowData(param){
  return request(`api/friends/follower`,{
    method:'GET',
    ...param,
  })
}