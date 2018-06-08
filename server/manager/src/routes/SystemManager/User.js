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

import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './TableList.less';

const FormItem = Form.Item;

@connect(({ system, loading }) => ({
    system,
    loading: loading.models.system,
  }))
  @Form.create()
  export default class User extends PureComponent {
 
    state={
        list_status:'edit',
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
          type: 'system/roles',
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
                <Button type="primary" onClick={() => this.handleModalVisible(true)}>
                    新增用户
                </Button>
              </span>
            </div> 
          </Form>);
    }

    render(){ 
        const {  data,loading } = this.props;
        const { list_status }=this.state
        const columns = [
            {
              title: '用户名',
              dataIndex: '',
            },
            {
                title: '手机号',
                dataIndex: '',
              },
            {
                title: '姓名',
                dataIndex: '',
            },
            {
                title: '角色',
                dataIndex: '',
            },
            {
                title: '操作',
                render: () => (
                  <Fragment>
                    <a href="">编辑</a>
                    <Divider type="vertical" />
                    <a href="">冻结</a>
                  </Fragment>
                ),
              },
        ] 
        return(
          <PageHeaderLayout title="查询表格">
            <Card bordered={false}>
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>{this.renderForm()}</div> 

                <StandardTable 
                  loading={loading}
                  data={[]}
                  columns={columns}
                  onSelectRow={this.handleSelectRows}
                  onChange={this.handleStandardTableChange}
                /> 
              </div>
            </Card>
          </PageHeaderLayout>


        )
    }
}