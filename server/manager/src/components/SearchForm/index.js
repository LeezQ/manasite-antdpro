import React, { Component } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import AddUserForm from 'components/System/AddForm';

import styles from './index.less';

const FormItem = Form.Item;

@Form.create()
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  handleModalVisible = () => {
    this.setState({ visible: true });
  };

  hidenModal = () => {
    this.setState({ visible: false });
  };

  handleSave = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.dispatch({
        type: 'user/addUserForm',
        payload: values,
      });
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  handleSearch = () => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.fetch(values);
    });
  };

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="用户名">
              {getFieldDecorator('mobile')(<Input placeholder="请输入" />)}
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
            <Button style={{ marginLeft: 8 }} type="primary" onClick={this.handleModalVisible}>
              新增用户
            </Button>
          </span>
        </div>
      </Form>
    );
  }
  render() {
    const { visible } = this.state;
    return (
      <div className={styles.tableListForm}>
        {this.renderForm()}
        <AddUserForm
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          onCancel={this.hidenModal}
          onCreate={this.handleSave}
        />
      </div>
    );
  }
}
