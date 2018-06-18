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
import AddUserForm from 'components/System/AddForm'
import {EditableFormRow,EditableCell} from 'components/System/EditableCell'

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    username: `Edrward ${i}`,
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
  export default class User extends PureComponent {

    constructor(props){
      super(props); 
 
      this.state={
        data, 
        editingKey:'',
        list_status:'edit',
        visible:false,
        }
      this.columns=[
        {
          title: '用户名',
          dataIndex: 'username',
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
          },
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '角色',
            dataIndex: 'role',
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
                          </a>
                        )}
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
        const { dispatch } = this.props;
        dispatch({
          type: 'system/roles',
        });
      }

    isEditing = (record) => {
      return record.key === this.state.editingKey;
    };
    edit(key) {
      this.setState({ editingKey: key });
    }
    cancel = () => {
      this.setState({ editingKey: '' });
    };
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
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <FormItem label="用户名">
                  {getFieldDecorator('user_name')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="姓名">
                  {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="角色">
                  {getFieldDecorator('role')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
            </Row>   
            <div style={{ overflow: 'hidden' }}>
              <span style={{ float: 'right', marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                    查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                    重置
                </Button> 
                <Button style={{ marginLeft: 8 }} type="primary" onClick={this.handleModalVisible}>
                    新增用户
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
          <PageHeaderLayout title="用户管理">
            <Card bordered={false}>
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>{this.renderForm()}</div> 

                <Table
                  components={components}
                  bordered
                  dataSource={this.state.data}
                  columns={columns}
                  rowClassName="editable-row"
                />
              </div>
            </Card> 
            <AddUserForm 
              wrappedComponentRef={this.saveFormRef}
              visible={visible}
              onCancel={this.hidenModal}
              onCreate={this.handleSave}
            />
          </PageHeaderLayout>


        )
    }
}