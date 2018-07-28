import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Table, Button } from 'antd';
import AddRoleForm from 'components/System/AddRoleForm';
import _ from 'lodash';

import styles from './TableList.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { roles } from '../../services/system';

@connect(({ system, loading }) => ({
  system,
  loading: loading.models.system,
}))
@Form.create()
export default class Role extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      roles: [],
      role: {},
      visible: false,
    };
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '上级角色',
        key: 'parent',
        render: record => {
          return <div>{this.state.rolesMap[record.parent].name}</div>;
        },
      },
      {
        title: '角色属性',
        key: 'privileges',
        render: record => {
          return <div>{record.channels.join(', ')}</div>;
        },
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (text, record) => {
          return (
            <div>
              <a onClick={() => this.edit(record)}>编辑</a> &nbsp;
            </div>
          );
        },
      },
    ];
  }

  componentDidMount() {
    this.fetchData({});
  }

  fetchData = params => {
    roles(params).then(data => {
      if (data.status === 'ok') {
        this.setState({ roles: data.data.list, rolesMap: _.keyBy(data.data.list, 'id') });
      }
    });
  };

  edit(role) {
    this.setState({ visible: true, role });
  }

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  handleModalVisible = () => {
    this.setState({ visible: true, role: {} });
  };

  hidenModal = () => {
    this.setState({ visible: false });
  };

  handleSave = () => {
    this.setState({ visible: false });
    this.fetchData({});
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  renderForm() {
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button style={{ marginLeft: 8 }} type="primary" onClick={this.handleModalVisible}>
              新增角色
            </Button>
          </span>
        </div>
      </Form>
    );
  }

  render() {
    const { visible } = this.state;

    return (
      <PageHeaderLayout title="角色管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>

            <Table
              bordered
              dataSource={this.state.roles}
              columns={this.columns}
              rowKey={record => record.id}
              rowClassName="editable-row"
            />
          </div>
        </Card>
        <AddRoleForm
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          onCancel={this.hidenModal}
          onCreate={this.handleSave}
          role={this.state.role}
          roles={this.state.roles}
        />
      </PageHeaderLayout>
    );
  }
}
