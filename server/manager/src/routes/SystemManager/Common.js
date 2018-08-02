import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Card, Tabs, Row, Col, Input, message, Modal } from 'antd';
import styled from 'styled-components';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { dictionaries, saveDictionaries } from '../../services/system';

const TabPane = Tabs.TabPane;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const RowV = styled(Row)`
  border-bottom: 2px solid #eee;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const InputV = styled(Input)`
  width: 200px;
`;

@connect(({ system, loading }) => ({
  system,
  loading: loading.models.system,
}))
@Form.create()
export default class Source extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      replyData: [],
      currentItem: {},
      visible: false,
    };
  }

  componentDidMount() {
    dictionaries({ type: 'feedback' }).then(data => {
      if (data && data.status === 'ok') {
        this.setState({ replyData: data.data.list });
      }
    });
  }

  editForm = currentItem => {
    this.setState({
      visible: true,
      currentItem,
    });
  };

  save = () => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      message.success('保存成功');
      const data = [
        {
          name: values.reply_speed,
          key: values.reply_speed,
          value: {
            side: values.reply_speed_side,
            options: [values['reply_speed-1'], values['reply_speed-2'], values['reply_speed-3']],
          },
          type: 'feedback',
          description: '',
        },
        {
          name: values.trust_degree,
          trust_degree: {
            side: values.trust_degree_side,
            options: [values['trust_degree-1'], values['trust_degree-2'], values['trust_degree-3']],
          },
          type: 'feedback',
        },
        {
          name: values.manner,
          manner: {
            side: values.manner_side,
            options: [values['manner-1'], values['manner-2'], values['manner-3']],
          },
          type: 'feedback',
        },
      ];
      for (let i = 0; i < data.length; i++) {
        saveDictionaries(data[i]).then(v => {
          console.log(v);
        });
      }
      // location.href = '/#/system/common';
      // setTimeout(() => {
      //   location.reload();
      // }, 30);
      // form.resetFields();
    });
  };

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const submitData = {
        ...this.state.currentItem,
        ...values,
      };
      saveDictionaries(submitData, submitData.id).then(() => {
        console.log('Received values of form: ', submitData);
        message.success('修改成功');
        this.setState({ visible: false });
      });
    });
  };

  render() {
    const { visible, replyData, currentItem } = this.state;

    return (
      <PageHeaderLayout title="评价管理">
        <Card>
          <Tabs>
            <TabPane tab="置换-确认收货" key="1">
              <RowV>
                <Col span={6}>评价标题</Col>
                <Col span={6}>评价方</Col>
                <Col span={6}>评价选项</Col>
                <Col span={6}>操作</Col>
              </RowV>
              {replyData.map((v, key) => {
                return (
                  <RowV key={key}>
                    <Col span={6}>{v.key}</Col>
                    <Col span={6}>{v.value}</Col>
                    <Col span={6}>{v.description}</Col>
                    <Col span={6}>
                      <a href="javascript:;" onClick={() => this.editForm(v)}>
                        编辑
                      </a>
                    </Col>
                  </RowV>
                );
              })}
            </TabPane>
            <TabPane tab="..." key="2">
              Content of tab 2
            </TabPane>
          </Tabs>
          <Modal visible={visible} title="编辑" onOk={() => this.submit()}>
            <Form>
              <Form.Item {...formItemLayout} label="评价标题">
                {this.props.form.getFieldDecorator('key', {
                  initialValue: currentItem.key,
                })(<InputV />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="评价标题">
                {this.props.form.getFieldDecorator('value', {
                  initialValue: currentItem.value,
                })(<InputV />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="描述">
                {this.props.form.getFieldDecorator('description', {
                  initialValue: currentItem.description,
                })(<InputV />)}
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </PageHeaderLayout>
    );
  }
}
