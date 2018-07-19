import mockjs from 'mockjs';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = true; //process.env.NO_PROXY === 'true';

//export default (noProxy ? {} : delay(proxy, 1000));
export default {
  'GET /api/(.*)': 'http://120.24.212.29:3000/api/v1/',
  'Delete /api/(.*)': 'http://120.24.212.29:3000/api/v1/',
  'POST /api/(.*)': 'http://120.24.212.29:3000/api/v1/',
  'PUT /api/(.*)': 'http://120.24.212.29:3000/api/v1/',
};
