import React, { Component } from 'react';
import { 
    Form, 
    Input,
    Modal, 
    Select,
} from 'antd'; 

const FormItem = Form.Item;
const Option = Select.Option;


class AddUserForm extends Component{  

    state={
        children:[],
    }
    componentDidMount(){  
        const children=[]
        children.push(<Option key={Math.random()}>运营</Option>);
        children.push(<Option key={Math.random()}>客服</Option>);
        children.push(<Option key={Math.random()}>超级管理员</Option>);
        children.push(<Option key={Math.random()}>市场推广</Option>);
        children.push(<Option key={Math.random()}>开发测试产品</Option>);
        children.push(<Option key={Math.random()}>运维</Option>);
        children.push(<Option key={Math.random()}>销售</Option>); 

        this.setState({children}) 
    }
    handleChange=(value)=>{
        console.log(value)
    }
    render(){
        const {children}=this.state
        const {visible,form,onCancel, onCreate} =this.props
        const { getFieldDecorator } = form;
        return( 
          <Modal
            visible={visible}
            title="增加用户"
            okText="确定"
            onCancel={onCancel}
            onOk={onCreate}
            destroyOnClose
          > 
            <Form layout="vertical">
              <FormItem label="用户名">
                {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                      <Input />
                    )}
              </FormItem>

              <FormItem label="手机号">
                {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入手机号' }],
                    })(
                      <Input />
                    )}
              </FormItem>

              <FormItem label="姓名">
                {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入手姓名' }],
                    })(
                      <Input />
                    )}
              </FormItem>

              <FormItem label="初始密码">
                {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入初始密码' }],
                    })(
                      <Input type="password" />
                    )}
              </FormItem>

              <FormItem label="选择角色">
                {getFieldDecorator('roles', {
                        rules: [{ required: true, message: '请输入初始密码' }],
                    })(
                      <Select
                        mode="multiple"
                        style={{ width: '100%' }} 
                        onChange={this.handleChange}
                      >
                        {children}
                      </Select>
                    )}
              </FormItem> 
            </Form>
          </Modal>  
        )
    }
}

export default Form.create()(AddUserForm)
