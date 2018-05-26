import React, { Component } from 'react';  
import { 
    Form, 
    Input,
    Modal,
} from 'antd'; 

const FormItem = Form.Item; 
class AddAddress extends Component{

    render(){
        const { visible, onCancel, onCreate, form } = this.props; 
        const { getFieldDecorator } = form;

        const newAddressLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 12 },
              sm: { span: 12 },
            },
          };

        return(
          <Modal 
            title="新增地址"
            visible={visible}
            onOk={onCreate}
            onCancel={onCancel}
            destroyOnClose
            okText="确定"
            cancelText="取消"
          >  
            <FormItem {...newAddressLayout} label="收件人" > 
              {getFieldDecorator('add_eciev_name', { 
                    rules: [{
                      required: true, message: '请输入收件人',
                    }],
                  })(
                    <Input />
                  )}
            </FormItem> 
            <FormItem {...newAddressLayout} label="联系电话" > 
              {getFieldDecorator('add_recive_phone', {  
                    rules: [{
                      required: true, message: '请输入联系电话',
                    }],
                  })(
                    <Input />
                  )}
            </FormItem>
            <FormItem {...newAddressLayout} label="详细地址" > 
              {getFieldDecorator('add_recive_address', {  
                    rules: [{
                      required: true, message: '请输入详细地址',
                    }],
                  })(
                    <Input />
                  )}
            </FormItem>  
          </Modal>  
        )
    }
}

export default Form.create()(AddAddress)