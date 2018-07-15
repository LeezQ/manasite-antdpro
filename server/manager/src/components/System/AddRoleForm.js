/*
   由zhaojunzhe于2018/7/14创建
*/
import React, { Component } from 'react';
import {
  Checkbox,
  Form,
  Input,
  Modal,
  Select,
  Button,
  Icon,
  Dropdown,
  Menu
} from 'antd';
import {getChannelList} from '../../services/channel';
import {getMenu, roles} from '../../services/system'
import ProvinceSelect from './ProvinceSelect.js'

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;



class AddRoleForm extends Component{
  
  state={
    channels: [],
    menu: []
  }
  componentDidMount(){
    this.getChannel();
    this.getMenu();
  }
  getMenu = () => {
    getMenu().then((data) => {
      if (data.status === 'ok') {
        this.setState({menu: data.data.list});
      }
    });
  };
  getChannel = () => {
    getChannelList().then((data) => {
      if (data.status === 'ok') {
        const channels = data.data.map((item) => {
          const obj = {};
          obj.label = item.name;
          obj.value = item.id;
          return obj;
        });
        this.setState({channels: channels});
      }
    })
  };
  handleChanelChange = (checkedValues) => {
    console.log(checkedValues)
  };
  handleParentChange = (e) => {
    console.log(e)
  };
  handleChange = (value) => {
    const obj = {};
    obj.province = value[0];
    obj.city = value[1];
    console.log(obj);
  };
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const obj = {};
        obj.name = values.name;
        obj.location = {
          province: '河北省',
          city: '石家庄市'
        };
        obj.channels = values.channels;
        roles(obj).then((data) => {
          console.log(data);
        })
        console.log('Received values of form: ', values);
      }
    });
  };
  render(){
    const {channels}=this.state
    const {visible,form,onCancel, onCreate} =this.props
    const { getFieldDecorator } = form;
    const menu = (
    <Menu onClick={this.handleParentChange}>
      <Menu.Item key="0">测试</Menu.Item>
    </Menu>
    );
    return(
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
            rules: [{ required: true, message: '请输入角色名称' }],
          })(
          <Input />
          )}
        </FormItem>
        
        <FormItem label="上级角色">
          {getFieldDecorator('parent', {
          
          })(
          <Dropdown overlay={menu} trigger={['click']}>
            <Button style={{ marginLeft: 8 }}>
              请选择 <Icon type="down" />
            </Button>
          </Dropdown>
          )}
        </FormItem>
        
        <FormItem label="所在地区">
          {getFieldDecorator('default_region', {
          
          })(<ProvinceSelect handleChange={this.handleChange}/>)}
        </FormItem>
        
        <FormItem label="管理频道">
          {getFieldDecorator('channels', {
            rules: [{ required: true, message: '请选择频道' }],
          })(
          <CheckboxGroup options={channels} onChange={this.handleChanelChange} />
          )}
        </FormItem>
        
        <FormItem label="选择资源">
          {getFieldDecorator('privileges', {
            rules: [{ required: true, message: '请选择资源' }],
          })(
          <Input />
          )}
        </FormItem>
      </Form>
    </Modal>
    )
  }
}

export default Form.create()(AddRoleForm)
