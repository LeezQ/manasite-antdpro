import React, { Component, Fragment} from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva'; 
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
} from 'antd';
import classNames from 'classnames'; 
import PageHeaderLayout from '../../layouts/PageHeaderLayout'; 
import {Credit,UserInfo,UserData,UserPublic} from '../../components/UserDetail'

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;



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


export default class UserDetial extends Component { 

  state = {
    operationkey: 'userinfo'
  };

  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };

  renderSwitch(key) {
    switch(key) {
      case 'credit':
        return (<Credit  />); 
      case 'userdata':
        return (<UserData   />);
      case 'userpublic':
        return (<UserPublic  />); 
      default:
        return (<UserInfo />); 
    }
  }

  render() { 
    const {operationkey} =this.state
    return (
      <PageHeaderLayout
        title="会员档案" 
        tabList={tabList}
        onTabChange={this.onOperationTabChange}
      >   
      {this.renderSwitch(operationkey)} 
      </PageHeaderLayout>
    );
  }
}