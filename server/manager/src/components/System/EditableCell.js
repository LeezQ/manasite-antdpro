import React from 'react'
import {Input, Form,Select } from 'antd'; 

const Option = Select.Option;
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const children=[]
children.push(<Option key={Math.random()}>运营</Option>);
children.push(<Option key={Math.random()}>客服</Option>);
children.push(<Option key={Math.random()}>超级管理员</Option>);
children.push(<Option key={Math.random()}>市场推广</Option>);
children.push(<Option key={Math.random()}>开发测试产品</Option>);
children.push(<Option key={Math.random()}>运维</Option>);
children.push(<Option key={Math.random()}>销售</Option>);  
export const EditableFormRow = Form.create()(EditableRow);

@Form.create()
export class EditableCell extends React.Component {
  getInput = () => {  
    if (this.props.inputType === 'Select') {
      return  (
        <Select
          mode="multiple"
          style={{ width: '100%' }} 
          onChange={this.handleChange}
        >
          {children}
        </Select>
    )
    }
    return <Input />;
  };
  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

export default{
  EditableFormRow,
  EditableCell,
}