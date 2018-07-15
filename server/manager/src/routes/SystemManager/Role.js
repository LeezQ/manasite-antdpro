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
import {roles, getMenu} from '../../services/system'

const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i.toString(),
    username: `Edrwards ${i}`,
    mobile: '13169871233',
    name: `name_is_${i}`,
  });
}

const FormItem = Form.Item;
const EditableContext = React.createContext();

@connect(({ system, loading }) => ({
  system,
  loading: loading.models.system,
}))

@Form.create()
export default class Role extends PureComponent {
  
  constructor(props){
    super(props);
    
    this.state={
      roles: [],
      data,
      editingKey:'',
      list_status:'edit',
      visible:false,
    }
    this.columns=[
      {
        title: '角色名称',
        dataIndex: 'username',
      },
      {
        title: '上级角色',
        dataIndex: 'mobile',
      },
      {
        title: '角色属性',
        dataIndex: 'name',
      },
      {
        title: '操作',
        dataIndex:'id',
        render: (text,record) => {
          const editable = this.isEditing(record);
          return (
          <div>
            {editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                <a
                  href="javascript:;"
                  onClick={() => this.save(form, record.key)}
                  style={{ marginRight: 8 }}
                >
                  保存
                </a>)}
                </EditableContext.Consumer>
                  <Popconfirm
                    title="确定要取消?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>取消</a>
                  </Popconfirm>
            </span>
            ) : (
            <div>
              <a onClick={() => this.edit(record.key)}>编辑</a> &nbsp;
              <a onClick={() => this.freeze(record.key)}>冻结</a>
            </div>
            )}
          </div>
          );
        },
      },
    ]
  }
  
  componentDidMount() {
    getMenu().then((data) => {
      console.log(data);
    })
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
  
  
  
  isEditing = (record) => {
    return record.key === this.state.editingKey;
  };
  freeze(key){
  
  }
  edit(key) {
    this.setState({ editingKey: key });
  }
  cancel = () => {
    this.setState({ editingKey: '' });
  };
  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(data);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }
  handleFormReset=()=>{
    const { form, dispatch } = this.props;
    form.resetFields();
  }
  
  handleSelectRows = rows => {
  
  };
  
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'system/roles',
      payload: params,
    });
  }
  
  handleModalVisible=()=>{
    this.setState({visible:true})
  }
  
  hidenModal=()=>{
    this.setState({visible:false})
  }
  
  handleSave=()=>{
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  
  renderForm(){
    const { getFieldDecorator } = this.props.form;
    return(
    <Form onSubmit={this.handleSearch} layout="inline">
      <div style={{ overflow: 'hidden' }}>
        <span style={{ float: 'right', marginBottom: 24 }}>
         <Button style={{ marginLeft: 8 }} type="primary" onClick={this.handleModalVisible}>
           新增角色
         </Button>
        </span>
      </div>
    </Form>);
  }
  
  render(){
    const {  data,loading } = this.props;
    const { list_status,visible }=this.state
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex ===  'role'?'Select':'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    
    return(
    <PageHeaderLayout title="角色管理">
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          
          <Table
          components={components}
          bordered
          dataSource={this.state.roles}
          columns={columns}
          rowClassName="editable-row"
          />
        </div>
      </Card>
      <AddRoleForm
      wrappedComponentRef={this.saveFormRef}
      visible={visible}
      onCancel={this.hidenModal}
      onCreate={this.handleSave}
      />
    </PageHeaderLayout>
    )
  }
}