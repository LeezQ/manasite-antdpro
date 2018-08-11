import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { AddChannelModel, EditChannelModel } from 'components/ChannelManger';
import { Row, Col, Card, Form, Input, Button, Modal, Divider, AutoComplete } from 'antd';

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
    checkId: '1',
    dataSource: [],
    checkValue: '',
    childIdList: '',
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
    const { checkValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        name: checkValue,
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
    console.log(this.state.selectedRows, this.state.childIdList);
  };
  handleAddChannel = () => {
    this.setState({ addModalVisible: true, checkId: '1' });
  };
  handleAddChildChannel = e => {
    this.setState({ addModalVisible: true, checkId: '2', currentData: e });
  };
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (err) {
        return;
      }
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
  handleSave = data => {
    const form = this.editFormRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.dispatch({
        type: 'channel/update',
        payload: { ...values, id: data.id },
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

  handleAddAllChannel = () => {
    const { channel: { list1 } } = this.props;
    let id;
    const { childIdList, checkValue } = this.state;
    console.log(childIdList);
    const { dispatch, form } = this.props;
    list1.list1.map(v => {
      if (v.name == checkValue) {
        id = v.id;
      }
    });
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        channels: childIdList,
        parent_id: id,
      };

      // this.setState({
      //   formValues: values,
      // });

      dispatch({
        type: 'channel/addP',
        payload: values,
        callback: () => {
          this.props.dispatch({
            type: 'channel/fetch',
            payload: {},
          });
        },
      });
    });
  };
  handleSearchData = value => {
    const { channel: { list1 } } = this.props;
    const values = {
      name: value,
      updatedAt: undefined,
    };
    this.props.dispatch({
      type: 'channel/search',
      payload: values,
      callback: () => {
        this.setState({
          dataSource: !list1.list1 ? [] : list1.list1,
        });
      },
    });
  };

  onSelect = value => {
    this.setState({ checkValue: value });
    console.log('onSelect', value);
  };

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource } = this.state;
    const { channel: { list1 } } = this.props;
    console.log(list1.list1);
    const a = [];
    list1.list1 == []
      ? ''
      : list1.list1.map(v => {
          a.push(v.name);
        });
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 2, lg: 2, xl: 48 }}>
          <Col md={8} sm={10}>
            <FormItem label="兴趣名称">
              <AutoComplete
                dataSource={a}
                style={{ width: 200 }}
                onSelect={this.onSelect}
                onChange={this.handleSearchData}
                placeholder="input here"
              />
              {/* {getFieldDecorator('name')(<Input placeholder="请输入"/>)} */}
            </FormItem>
          </Col>
          <Col md={16} sm={10}>
            <span style={{ marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} type="primary" onClick={this.handleAddAllChannel}>
                批量设置父频道
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <Button style={{ float: 'right' }} type="primary" onClick={this.handleAddChannel}>
                增加兴趣
              </Button>
            </span>
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
      },
      {
        title: '兴趣名称',
        render: val => (
          <Fragment>
            <div style={{ paddingLeft: val.pid == '0' ? '0px' : '30px' }}>
              {val.name == '' ? val.displayName : val.name}
            </div>
          </Fragment>
        ),
      },
      {
        title: '显示名称',
        render: val => (
          <Fragment>
            <div style={{ paddingLeft: val.pid == '0' ? '0px' : '30px' }}>{val.displayName}</div>
          </Fragment>
        ),
      },
      {
        title: '操作',
        align: 'right',
        render: val => (
          <Fragment>
            {val.pid == 0 ? (
              <a onClick={() => this.handleAddChildChannel(val)}>添加子频道</a>
            ) : (
              <a onClick={() => this.handleEditChannel(val)}>编辑</a>
            )}
            {val.pid == 0 ? <Divider type="vertical" /> : ''}
            {val.pid == 0 ? <a onClick={() => this.handleEditChannel(val)}>编辑</a> : ''}
            <Divider type="vertical" />
            <a onClick={() => this.confirmDeleteChanel(val.id)}>删除</a>
          </Fragment>
        ),
      },
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        const a = `${selectedRowKeys}`;
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({ childIdList: a });
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    return (
      <PageHeaderLayout title="兴趣频道管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              rowSelection={rowSelection}
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
          currentData={this.state.currentData}
          checkId={this.state.checkId}
          onCancel={this.handleCancel}
        />
        <EditChannelModel
          wrappedComponentRef={ref => {
            this.editFormRef = ref;
          }}
          visible={this.state.editModalVisible}
          onSave={() => this.handleSave(this.state.currentData)}
          currentData={this.state.currentData}
          onCancel={this.handleEditCancel}
        />
      </PageHeaderLayout>
    );
  }
}
