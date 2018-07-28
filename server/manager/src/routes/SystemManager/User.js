import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Table, Tag, Popconfirm, Select } from 'antd';
import SearchForm from 'components/SearchForm';
// import { EditableFormRow, EditableCell, EditableContext } from 'components/System/EditableCell';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './TableList.less';
import { getUsersList, freeze, updateUserForm } from '../../services/user';
import { roles as fetchRole } from '../../services/system';

const { Option } = Select;
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    const { roles } = this.props;
    if (this.props.inputType === 'Select') {
      return (
        <Select mode="multiple" style={{ width: '100%' }} onChange={this.handleChange}>
          {roles.map((role, index) => {
            return (
              <Option value={role.id} key={index}>
                {role.name}
              </Option>
            );
          })}
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
                  {getFieldDecorator(`${dataIndex}`, {
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
      roles: [],
    };
    this.columns = [
      {
        title: '用户名',
        editable: true,
        key: 'uid',
        dataIndex: 'uid',
        render: (text, record) => {
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
            <div style={{ lineHeight: '42px' }}>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => {
                      return (
                        <a
                          href="javascript:;"
                          onClick={() => this.save(form, record)}
                          style={{ marginRight: 8 }}
                        >
                          保存
                        </a>
                      );
                    }}
                  </EditableContext.Consumer>
                  <a style={{ marginRight: 8 }} onClick={() => this.cancel(record.uid)}>
                    取消
                  </a>
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

  getData = params => {
    getUsersList(params).then(data => {
      if (data && data.status === 'ok') {
        this.setState({ data: data.data.list });
      }
    });
  };

  getRoles = () => {
    fetchRole().then(data => {
      if (data && data.status === 'ok') {
        this.setState({ roles: data.data.list });
      }
    });
  };

  componentDidMount() {
    this.getData({});
    this.getRoles();
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

  save(form, record) {
    form.validateFields((error, values) => {
      if (error) {
        return;
      }
      const newData = {
        ...record,
        ...values,
      };
      updateUserForm(newData).then(() => {
        this.getData({});
        this.setState({ editingKey: '' });
      });
    });
  }

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
          roles: this.state.roles,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <PageHeaderLayout title="用户管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <SearchForm dispatch={this.props.dispatch} fetch={this.getData} />

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
