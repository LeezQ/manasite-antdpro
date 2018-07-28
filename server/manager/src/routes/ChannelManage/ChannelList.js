import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { AddChannelModel, EditChannelModel } from 'components/ChannelManger';
import { Row, Col, Card, Form, Input, Button, Modal, Divider } from 'antd';

import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './ChannelList.less';

const FormItem = Form.Item;
const confirm = Modal.confirm;

@connect(({ channel, loading }) => ({
  channel,
  loading: loading.models.channel,
}))
@Form.create()
export default class ChannelList extends Component {
  state = {
    selectedRows: [],
    formValues: {},
    addModalVisible: false,
    editModalVisible: false,
    currentData: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'channel/fetch',
    });
  }
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'channel/fetch',
      payload: params,
    });
  };
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  confirmDeleteChanel = id => {
    const { selectedRows } = this.state;
    if (!(id || selectedRows)) return;
    confirm({
      title: '温馨提示',
      content: '你确定要删除',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({
          type: 'channel/delete',
          payload: {
            id,
          },
          callback: () => {
            this.props.dispatch({
              type: 'channel/fetch',
              payload: {},
            });
          },
        });
      },
    });
  };
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

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
        type: 'channel/fetch',
        payload: values,
      });
    });
  };
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'channel/fetch',
    });
  };
  handleAddChannel = () => {
    this.setState({ addModalVisible: true });
  };
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      this.props.dispatch({
        type: 'channel/add',
        payload: values,
        callback: () => {
          this.props.dispatch({
            type: 'channel/fetch',
            payload: {},
          });
        },
      });
      form.resetFields();
      this.setState({ addModalVisible: false });
    });
  };
  handleSave = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      debugger;
      this.props.dispatch({
        type: 'channel/update',
        payload: values,
        callback: () => {
          this.props.dispatch({
            type: 'channel/fetch',
            payload: {},
          });
        },
      });
      form.resetFields();
      this.setState({ editModalVisible: false });
    });
  };
  handleEditCancel = e => {
    this.setState({ editModalVisible: false });
  };
  handleCancel = () => {
    const form = this.formRef.props.form;
    form.resetFields();
    this.setState({ addModalVisible: false });
  };
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleEditChannel = e => {
    this.setState({ editModalVisible: true, currentData: e });
  };
  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 2, lg: 2, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="兴趣名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span style={{ marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>

              <Button style={{ marginLeft: 8 }} type="primary" onClick={this.handleAddChannel}>
                增加兴趣
              </Button>
            </span>
          </Col>
          <Col>
            <Button type="primary" style={{ float: 'right' }}>
              保存排序
            </Button>
          </Col>
        </Row>
        <Row />
      </Form>
    );
  }
  render() {
    const { channel: { data }, loading } = this.props;
    const { selectedRows } = this.state;

    const columns = [
      {
        title: '',
        dataIndex: 'order',
        width: 60,
        render: val => <Input defaultValue={val} style={{ width: 50, height: 30 }} />,
      },
      {
        title: '兴趣名称',
        dataIndex: 'name',
      },
      {
        title: '别名-显示处',
        dataIndex: 'displayName',
      },
      {
        title: '内容数量',
        dataIndex: '',
      },
      {
        title: '操作',
        render: val => (
          <Fragment>
            <a onClick={() => this.confirmDeleteChanel(val.id)}>删除</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleEditChannel(val)}>编辑</a>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderLayout title="兴趣频道管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              rowKey="id"
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <AddChannelModel
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.addModalVisible}
          onCreate={this.handleCreate}
          onCancel={this.handleCancel}
        />
        <EditChannelModel
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.editModalVisible}
          onSave={this.handleSave}
          currentData={this.state.currentData}
          onCancel={this.handleEditCancel}
        />
      </PageHeaderLayout>
    );
  }
}
