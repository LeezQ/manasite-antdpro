import mockjs from 'mockjs';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = true; //process.env.NO_PROXY === 'true';

//export default (noProxy ? {} : delay(proxy, 1000));
export default {
  'GET /api/(.*)': 'http://47.95.250.201:3000/api/v1/',
  'POST /api/(.*)': 'http://47.95.250.201:3000/api/v1/',
  'DELETE /api/(.*)': 'http://47.95.250.201:3000/api/v1/'
};
