/*
   由zhaojunzhe于2018/7/14创建
*/
import React, { Component } from 'react';
import { Checkbox, Form, Input, Modal, Select, Row, Col, Tree } from 'antd';
import { getChannelList } from '../../services/channel';
import { getMenu, addRole, updateRole } from '../../services/system';
import ProvinceSelect from './ProvinceSelect.js';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const TreeNode = Tree.TreeNode;
const Option = Select.Option;

class AddRoleForm extends Component {
  state = {
    channels: [],
    menus: [],
    checkedMenus: [],
  };
  componentDidMount() {
    this.getChannel();
    this.getMenu();
  }

  onCheck = checkedKeys => {
    this.setState({
      checkedMenus: checkedKeys,
    });
  };

  getMenu = () => {
    getMenu().then(data => {
      if (data.status === 'ok') {
        this.setState({ menus: data.data.records });
      }
    });
  };

  getChannel = () => {
    getChannelList().then(data => {
      if (data && data.status === 'ok') {
        const channels = data.data.map(item => {
          const obj = {};
          obj.label = item.name;
          obj.value = item.id;
          return obj;
        });
        this.setState({ channels });
      }
    });
  };
  handleChange = value => {
    const obj = {};
    obj.province = value[0];
    obj.city = value[1];
  };

  handleSubmit = () => {
    const { checkedMenus } = this.state;
    const { role } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('Received values of form: ', values);
      if (!err) {
        const obj = values;
        obj.location = {
          province: '河北省',
          city: '石家庄市',
        };

        obj.privileges = checkedMenus.map(val => {
          return parseInt(val, 10);
        });
        if (typeof role.id !== 'undefined') {
          updateRole(role.id, obj).then(() => {
            this.props.onCreate();
          });
        } else {
          addRole(obj).then(() => {
            this.props.onCreate();
          });
        }
      }
    });
  };
  render() {
    const { channels, menus } = this.state;
    const { visible, form, onCancel, role, roles } = this.props;
    const { getFieldDecorator } = form;

    role.privileges = (role.privileges || []).map(privilege => {
      return `${privilege}`;
    });

    return (
      <Modal
        visible={visible}
        title="增加角色"
        okText="确定"
        onCancel={onCancel}
        onOk={this.handleSubmit}
        destroyOnClose
      >
        <Form layout="vertical">
          <FormItem label="角色名称">
            {getFieldDecorator('name', {
              initialValue: role.name || '',
              rules: [{ required: true, message: '请输入角色名称' }],
            })(<Input />)}
          </FormItem>

          <FormItem label="上级角色">
            {getFieldDecorator('parent', {
              initialValue: role.parent || '',
            })(
              <Select style={{ width: 120 }}>
                {roles.map((item, index) => {
                  return (
                    <Option value={item.id} key={index}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>

          <FormItem label="所在地区">
            <ProvinceSelect handleChange={this.handleChange} />
          </FormItem>

          <FormItem label="管理频道">
            {getFieldDecorator('channels', {
              rules: [{ required: true, message: '请选择频道' }],
              initialValue: role.channels || [],
            })(
              <CheckboxGroup>
                <Row>
                  {channels.map(v => {
                    return (
                      <Col span={8} key={v.value} style={{ marginBottom: 8 }}>
                        <Checkbox value={v.value}>{v.label}</Checkbox>
                      </Col>
                    );
                  })}
                </Row>
              </CheckboxGroup>
            )}
          </FormItem>

          <FormItem label="选择资源">
            <Tree
              checkable
              onCheck={this.onCheck}
              defaultExpandAll
              defaultCheckedKeys={role.privileges || []}
            >
              <TreeNode title="会员管理" key="0">
                <TreeNode title="操作" key="1" />
                <TreeNode title="操作2" key="2" />
              </TreeNode>
              <TreeNode title="兴趣频道管理" key="3">
                <TreeNode title="操作1" key="4" />
                <TreeNode title="操作2" key="5" />
              </TreeNode>
            </Tree>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddRoleForm);
