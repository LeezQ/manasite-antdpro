/*
   由zhaojunzhe于2018/7/14创建
*/
import React, { Component } from 'react';
import { Form, Input, Modal, Select, message } from 'antd';

import { updateMenu, addMenu } from '../../services/system';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

class AddRoleForm extends Component {
  state = {};
  componentDidMount() {}
  handleSubmit = () => {
    const { currentItem = {} } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (currentItem.id) {
          updateMenu(values, currentItem.id).then(() => {
            message.success('编辑成功');
            this.props.onSave();
          });
        } else {
          addMenu(values).then(() => {
            message.success('编辑成功');
            this.props.onSave();
          });
        }
      }
    });
  };
  render() {
    const { visible, form, onCancel, currentItem = {} } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="编辑资源"
        okText="确定"
        onCancel={onCancel}
        onOk={this.handleSubmit}
        destroyOnClose
      >
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="资源名称">
            {getFieldDecorator('name', {
              initialValue: currentItem.name,
              rules: [{ required: true, message: '请输入资源名称' }],
            })(<Input />)}
          </FormItem>

          {/* <FormItem {...formItemLayout} label="资源编码">
            {getFieldDecorator('bianma', {
              initialValue: currentItem.id,
              rules: [{ required: true, message: '请输入资源编码' }],
            })(<Input />)}
          </FormItem> */}

          <FormItem {...formItemLayout} label="上级资源">
            {getFieldDecorator('parent', {
              initialValue: currentItem.parent,
            })(<Input />)}
          </FormItem>

          {/* <FormItem {...formItemLayout} label="资源类型">
            {getFieldDecorator('parent', {})(
              <Select placeholder="选择资源类型">
                <Option value="menu">menu</Option>
                <Option value="list">list</Option>
              </Select>
            )}
          </FormItem> */}

          <FormItem {...formItemLayout} label="资源URL">
            {getFieldDecorator('url', {
              initialValue: currentItem.url,
              rules: [{ required: true, message: '请输入资源url' }],
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="icon">
            {getFieldDecorator('icon', {
              initialValue: currentItem.icon,
              rules: [{ required: true, message: 'icon' }],
            })(<Input />)}
          </FormItem>

          {/* <FormItem {...formItemLayout} label="排序">
            {getFieldDecorator('paixu', {
              rules: [{ required: true, message: '请选择排序' }],
            })(<Input />)}
          </FormItem> */}

          {/* <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('beizhu', {
              rules: [{ required: true, message: '请输入资源编码' }],
            })(<Input.TextArea />)}
          </FormItem> */}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddRoleForm);
