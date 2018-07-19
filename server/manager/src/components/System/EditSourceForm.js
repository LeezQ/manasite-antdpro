/*
   由zhaojunzhe于2018/7/14创建
*/
import React, { Component } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { source } from '../../services/system';

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
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };
  render() {
    const { visible, form, onCancel } = this.props;
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
              rules: [{ required: true, message: '请输入资源名称' }],
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="资源编码">
            {getFieldDecorator('bianma', {
              rules: [{ required: true, message: '请输入资源编码' }],
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="上级资源">
            {getFieldDecorator('parent', {})(
              <Select placeholder="选择上级资源">
                <Option value="china">一级菜单</Option>
                <Option value="use">二级菜单</Option>
              </Select>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="资源类型">
            {getFieldDecorator('parent', {})(
              <Select placeholder="选择资源类型">
                <Option value="menu">menu</Option>
                <Option value="list">list</Option>
              </Select>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="资源URL">
            {getFieldDecorator('url', {
              rules: [{ required: true, message: '请输入资源url' }],
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="排序">
            {getFieldDecorator('paixu', {
              rules: [{ required: true, message: '请选择排序' }],
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('beizhu', {
              rules: [{ required: true, message: '请输入资源编码' }],
            })(<Input.TextArea />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddRoleForm);
