import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Table, Tag, Popconfirm, Select } from 'antd';
import SearchForm from 'components/SearchForm';
// import { EditableFormRow, EditableCell, EditableContext } from 'components/System/EditableCell';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './TableList.less';
import { getUsersList, freeze } from '../../services/user';

const { Option } = Select;
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

const children = [];
children.push(<Option key={Math.random()}>运营</Option>);
children.push(<Option key={Math.random()}>客服</Option>);
children.push(<Option key={Math.random()}>超级管理员</Option>);
children.push(<Option key={Math.random()}>市场推广</Option>);
children.push(<Option key={Math.random()}>开发测试产品</Option>);
children.push(<Option key={Math.random()}>运维</Option>);
children.push(<Option key={Math.random()}>销售</Option>);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'Select') {
      return (
        <Select mode="multiple" style={{ width: '100%' }} onChange={this.handleChange}>
          {children}
        </Select>
      );
    }
    return <Input />;
  };
  render() {
    const { editing, dataIndex, title, inputType, record, index, ...restProps } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `Please Input ${title}!`,
                      },
                    ],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

@connect(({ system, loading }) => ({
  system,
  loading: loading.models.system,
}))
export default class User extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      editingKey: '',
    };
    this.columns = [
      {
        title: '用户名',
        editable: true,
        key: 'uid',
        render: record => {
          return (
            <div>
              {record.uid} {record.isDisabled && <Tag color="orange">orange</Tag>}
            </div>
          );
        },
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        editable: true,
      },
      {
        title: '姓名',
        dataIndex: 'nickname',
        editable: true,
      },
      {
        title: '角色',
        dataIndex: 'role',
        width: '200px',
        render: () => {
          return <div>运营</div>;
        },
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => {
                      return (
                        <a
                          href="javascript:;"
                          onClick={() => this.save(form, record.uid)}
                          style={{ marginRight: 8 }}
                        >
                          保存
                        </a>
                      );
                    }}
                  </EditableContext.Consumer>
                  <Popconfirm title="确定要取消?" onConfirm={() => this.cancel(record.uid)}>
                    <a style={{ marginRight: 8 }}>取消</a>
                  </Popconfirm>
                  <Popconfirm
                    title="确定要重置密码吗?"
                    onConfirm={() => this.resetPassword(record.uid)}
                  >
                    <a>密码重置</a>
                  </Popconfirm>
                </span>
              ) : (
                <div>
                  <a onClick={() => this.edit(record.uid)}>编辑</a> &nbsp;
                  <Popconfirm title="确定要冻结此帐号吗?" onConfirm={() => this.freeze(record.uid)}>
                    <a>冻结</a>
                  </Popconfirm>
                </div>
              )}
            </div>
          );
        },
      },
    ];
  }

  componentDidMount() {
    getUsersList().then(data => {
      if (data.status === 'ok') {
        console.log(data.data);
        this.setState({ data: data.data.list });
      }
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'system/roles',
    });
  }

  isEditing = record => {
    return record.uid === this.state.editingKey;
  };
  edit(key) {
    this.setState({ editingKey: key });
  }
  cancel = () => {
    this.setState({ editingKey: '' });
  };

  freeze = key => {
    freeze({
      userIds: key,
      disabled: true,
    });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.uid);
      debugger;
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

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
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'role' ? 'Select' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <PageHeaderLayout title="用户管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <SearchForm dispatch={this.props.dispatch} />

            <Table
              components={components}
              bordered
              dataSource={this.state.data}
              columns={columns}
              rowKey="uid"
              rowClassName="editable-row"
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
