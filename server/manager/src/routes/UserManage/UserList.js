import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {routerRedux} from 'dva/router';
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
  Radio,
  Tag
} from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './UserList.less';

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({user, loading}) => ({
  user,
  loading: loading.models.user,
}))

@Form.create()
export default class UserList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'user/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => { 
    const {dispatch} = this.props;
    const {formValues} = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'user/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'user/fetch',
      payload: {},
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const {dispatch, form} = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'user/fetch',
        payload: values,
      });
    });
  };

  confirmFreezeUser = (row, disabled) => { 
    const {selectedRows} = this.state;
    if (!(row || selectedRows))
      return;

    confirm({
      title: '温馨提示',
      content: '你确定要' +(disabled ? '冻结' : '解冻')+ '此会员吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: ()=> {
        this.props.dispatch({
          type: 'user/freeze',
          payload: {
            userIds: row.user_id ,
            disabled: disabled
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });

            this.props.dispatch({
              type: 'user/fetch',
              payload: {},
            });
          },
        });
      }
    });
  };

  renderForm() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="芥摩号">
              {getFieldDecorator('uid')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="昵　　称">
              {getFieldDecorator('nickname')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('mobile')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="所在位置">
              {getFieldDecorator('location')(
                <Select placeholder="请选择" style={{width: '100%'}}>

                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            {getFieldDecorator('verified')(
              <RadioGroup>
                <RadioButton>不限</RadioButton>
                <RadioButton value="true">已认证</RadioButton>
                <RadioButton value="false">未认证</RadioButton>
              </RadioGroup>
            )}
            <span style={{float: 'right', marginBottom: 24}}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {user: {data}, loading} = this.props;
    const {selectedRows, modalVisible} = this.state; 

    const columns = [
      { 
        title: '',
        dataIndex: 'verified',
        render(val) {
        return val ? (<Tag color="#108ee9">认证</Tag>): (<Tag>未认证</Tag>);
        },
      },
      { 
        title: '芥摩号',
        dataIndex: 'uid',
      },
      { 
        title: '昵称/姓名',
        dataIndex: 'nickname',
      },
      { 
        title: '手机号',
        dataIndex: 'mobile',
        render(val) {
          return val ? (<span>{val}</span>) : (<span className={styles.warning}>未绑定</span>);
        },
      },
      { 
        title: '所在位置',
        dataIndex: 'location',
        render(val) {
          return <span/>;
        },
      },
      { 
        title: '注册时间',
        dataIndex: 'create_at',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      { 
        title: '操作',
        render: (val) => (
          <Fragment>
            { 
              val.isDisabled ?
                (<a onClick={() => this.confirmFreezeUser(val, false)}>解冻</a>) :
                (<a onClick={() => this.confirmFreezeUser(val, true)}>冻结</a>)
            }
            <Divider type="vertical"/>
            <a onClick={() => this.props.dispatch(routerRedux.push({pathname: '/users/editform', query: {user:val.user_id} }))}>编辑</a>
            <Divider type="vertical"/>
            <a onClick={()=>this.props.dispatch(routerRedux.push({pathname: '/users/detailform', query: {user:val.user_id}}))}>查看</a>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderLayout title="会员管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div> 
            <StandardTable 
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
