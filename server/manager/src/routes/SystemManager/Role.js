import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    Dropdown,
    Menu,
    InputNumber,
    DatePicker,
    Modal,
    message,
    Badge,
    Divider,
  } from 'antd';

  @connect(({ system, loading }) => ({
    system,
    loading: loading.models.system,
  }))
  @Form.create()
  export default class User extends PureComponent { 
    render(){
        return (<div>users</div>)
    }
  }