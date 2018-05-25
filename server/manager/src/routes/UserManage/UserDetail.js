import React, {Component} from 'react';
import { connect } from 'dva';  
import PageHeaderLayout from '../../layouts/PageHeaderLayout'; 
import {Credit,UserInfo,UserData,UserPublic,Follow} from '../../components/UserDetail'   
 
const tabList = [
  {
    key: 'userinfo',
    tab: '会员信息',
  },
  {
    key: 'credit',
    tab: '会员信用',
  },{
    key: 'userdata',
    tab: '会员数据',
  },
  {
    key: 'userpublic',
    tab: '会员发布',
  },
];

@connect(({user,loading}) => ({
  user,
  loading: loading.models.user,
})) 

class UserDetail extends Component {    

  state={ 
    operationkey:'userinfo',
  } 
  componentDidMount(){
    const {dispatch,location} =this.props
    dispatch({
      type:'user/info',
      payload:location.user_id,
    })
  }
  onOperationTabChange =(key) => {     
    this.setState({operationkey:key})
  };   


  renderSwitch=(key,currentUser,stats)=>{
    switch(key) {
      case 'credit':
        return (<Credit stats={stats} />); 
      case 'userdata':
        return (<UserData stats={stats} />);
      case 'userpublic':
        return (
          <UserPublic  {...this.props} />); 
      default:
        return (<UserInfo currentUser={currentUser} />); 
    }
  }

  render() {   
    const {operationkey} =this.state  
    const {user:{currentUser,stats}}=this.props
    return (
      <PageHeaderLayout
        title="会员档案"
        tabList={tabList}
        onTabChange={this.onOperationTabChange}
      > 
        {this.renderSwitch(operationkey,currentUser,stats)}  
      </PageHeaderLayout>
    );
  }
}

export default UserDetail
