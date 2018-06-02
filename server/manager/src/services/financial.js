import request from '../utils/request';

// 收费记录
export async function chargesData(param){
    return request(`api/finance/charges`,{
      method:'GET',
      ...param,
    })
  }

// 押金流水
export async function depositsData(param){
    return request(`api/finance/deposits`,{
      method:'GET',
      ...param,
    })
}

// 充值提现记录
export async function payrecordsData(param){
    return request(`api/finance/pay_records`,{
      method:'GET',
      ...param,
    })
}