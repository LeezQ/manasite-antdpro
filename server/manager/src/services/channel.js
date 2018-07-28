import request from '../utils/request';

export async function getChannelList(params) {
  return request('/api/channels', { method: 'GET', ...params });
}

export async function updateChannel(param, channelId) {
  return request(`/api/channels/${channelId}`, {
    method: 'POST',
    body: param,
  });
}

export async function addChannel(param) {
  return request('/api/channels', {
    method: 'POST',
    body: param,
  });
}

export async function deleteChannel(id) {
  return request(`/api/channels/${id}`, {
    method: 'delete',
  });
}
