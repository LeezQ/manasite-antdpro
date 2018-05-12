import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from 'components/Login';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        欢迎使用芥摩管理平台，请选择菜单进行操作。
      </div>
    );
  }
}
