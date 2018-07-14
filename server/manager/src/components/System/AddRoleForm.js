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
import {getChannelList} from '../../services/channel'

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;



class AddRoleForm extends Component{
  
  state={
    channels: []
  }
  componentDidMount(){
    this.getChannel();
  }
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
  render(){
    const {channels}=this.state
    const {visible,form,onCancel, onCreate} =this.props
    const { getFieldDecorator } = form;
    const menu = (
    <Menu onClick={this.handleParentChange}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
    );
    return(
    <Modal
    visible={visible}
    title="增加角色"
    okText="确定"
    onCancel={onCancel}
    onOk={onCreate}
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
        
        <FormItem label="上机角色">
          {getFieldDecorator('parent', {
            rules: [{ required: true, message: '请选择父级角色' }],
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
            rules: [{ required: true, message: '请选择所在地区' }],
          })(
          <Dropdown overlay={menu}>
            <Button style={{ marginLeft: 8 }}>
              请选择 <Icon type="down" />
            </Button>
          </Dropdown>
          )}
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
