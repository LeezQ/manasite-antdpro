import request from '../utils/request';


export async function getChannelList(){
  return request('/api/channels')
}

export async function deleteChannel(id){
  return request(`/api/channels/${id}`,{
    method:'delete'
  })
}