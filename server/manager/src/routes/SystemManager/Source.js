import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Table,
  Button,
  Popconfirm,
  Select,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './TableList.less';
import AddRoleForm from 'components/System/AddRoleForm'
import {EditableFormRow,EditableCell} from 'components/System/EditableCell'
import {roles} from '../../services/system'


const FormItem = Form.Item;
const EditableContext = React.createContext();

@connect(({ system, loading }) => ({
  system,
  loading: loading.models.system,
}))

@Form.create()
export default class Source extends PureComponent {
  
  constructor(props){
    super(props);
    
    this.state={
      roles: [],
    }
  }
  
  componentDidMount() {
    roles().then((data) => {
      if (data.status === 'ok') {
        this.setState({roles: data.data.list})
      }
      console.log(data)
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'system/roles',
    });
  }
  
  render(){
    
    return(
    <PageHeaderLayout title="资源管理">
      <Card bordered={false}>
        123
      </Card>
    </PageHeaderLayout>
    )
  }
}