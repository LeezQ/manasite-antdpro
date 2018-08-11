import React, {Component} from 'react';
import {Form, Modal, Row, Col, Input, Select, Button, Icon} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

let uuid = 0;

class EditChannelModel extends Component {
  remove = k => {
    const {form} = this.props;
    const keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };
  add = () => {
    const {form} = this.props;
  };

  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;
    const {visible, onCancel, onSave, currentData} = this.props;
    const topformItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 10},
      },
    };
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 24},
      },
    };
    return (
      <Modal
        title="修改兴趣"
        visible={visible}
        onCancel={onCancel}
        onOk={onSave}
        cancelText="取消"
        okText="保存"
      >
        <Form>
          <FormItem {...topformItemLayout} label="兴趣名称">
            {getFieldDecorator('name', {
              initialValue: currentData.name,
              rules: [
                {
                  required: true,
                  message: '名称不能为空！',
                },
              ],
            })(<Input/>)}
          </FormItem>
          <FormItem {...topformItemLayout} label="显示名称">
            {getFieldDecorator('displayName', {
              initialValue: currentData.displayName,
              rules: [
                {
                  required: true,
                  message: '别名不能为空！',
                },
              ],
            })(<Input/>)}
          </FormItem>
          <FormItem {...topformItemLayout} label="排名">
            {getFieldDecorator('order', {
              initialValue: currentData.order,
              rules: [
                {
                  required: true,
                  message: '排名不能为空！',
                },
              ],
            })(<Input/>)}
          </FormItem>
          {/* <Row gutter={16}>
            <Col span={6} offset={0}>
              <label>别名显示出</label>
            </Col>
            <Col span={6} offset={0}>
              <label>别名</label>
            </Col>
          </Row>
          {formItems}
          <FormItem {...formItemLayout}>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus" />添加
            </Button>
          </FormItem>*/}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(EditChannelModel);
