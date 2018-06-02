import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {routerRedux} from 'dva/router';
import {Form,Card,Modal,Row,Col,Input,Select,Button,Icon} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

let uuid = 0;
class EditChannelModel extends Component{ 
    constructor(props) {
        super(props);
    }
    remove = (k) => {
        const { form } = this.props; 
        const keys = form.getFieldValue('keys');  
        form.setFieldsValue({
          keys: keys.filter(key => key !== k),
        });
      }
    add = () => {
    const { form } = this.props; 
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++; 
    form.setFieldsValue({
        keys: nextKeys,
    });
    }

    render(){
        const { getFieldDecorator,getFieldValue } =this.props.form;
        const { visible,onCancel,onSave,currentData,form} = this.props;    
        const topformItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 10 },
            },
          };
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 24 },
            },
          };
        const formItemLayoutWithOutLabel = { 
            wrapperCol: {
                xs: { span: 12, offset: 0 },
                sm: { span: 10, offset: 0 },
              },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
        return (
          <Row gutter={16}>
            <Col span={6} offset={0}>
              <FormItem
                required
                key={k}
              >
                {getFieldDecorator(`display_name[${k}]`, {  
                    initialValue:-1,
                    rules: [{
                        required: true, 
                        message: "选择别名显示出",
                    }],
                })( 
                  <Select>
                    <Option value={-1}>请选择</Option>
                    <Option value={0}>分享</Option>
                    <Option value={1}>置换</Option> 
                    <Option value={2}>发现</Option>
                  </Select>
                )} 
              </FormItem>
            </Col> 
            <Col  span={10} offset={0}>
              <FormItem 
                required
                key={k}
              >
                {getFieldDecorator(`alisa_name[${k}]`, {  
                })(  
                  <Input placeholder=' 别名' />
                )}    
              </FormItem>
            </Col> 
            <Col  span={4} offset={0}>
              {<Icon
                className="dynamic-delete-button"
                type="minus-circle-o" 
                onClick={() => this.remove(k)}
              />
                } 
            </Col>
          </Row>
        );
        });
        return( 
          <Modal
            title='增加兴趣'
            visible={visible} 
            onCancel={onCancel}
            onOk={onSave}
            cancelText="取消"
            okText="保存"
          >   
            <Form>
              <FormItem {...topformItemLayout} label="兴趣名称">
                {getFieldDecorator('name', {
                    initialValue:currentData.name,
                        rules: [{
                        required: true, message: '名称不能为空！',
                        }],
                    })(
                      <Input />
                    )}
              </FormItem> 
              <Row gutter={16}>
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
              </FormItem>
            </Form>
          </Modal>
        )
    }
} 
export default Form.create()(EditChannelModel); 