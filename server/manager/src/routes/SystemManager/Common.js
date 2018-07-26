import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Card, Tabs, Button, Row, Col, Input, message, Radio } from 'antd';
import styled from 'styled-components';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { dictionaries, saveDictionaries } from '../../services/system';

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const RowV = styled(Row)`
  border-bottom: 2px solid #eee;
  padding: 10px;
  display: flex;
  align-items: center;
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
      data: {},
      isEdit: window.location.toString().indexOf('edit=true') > 0,
    };
  }

  componentDidMount() {
    dictionaries({ type: 'feedback' }).then(data => {
      if (data && data.status === 'ok') {
        // this.setState({ sourceData: data.data.list });
      }
    });
  }

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
          reply_speed: {
            side: values.reply_speed_side,
            options: [values['reply_speed-1'], values['reply_speed-2'], values['reply_speed-3']],
          },
          type: 'feedback',
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
      console.log(data);
      saveDictionaries(data).then(v => {
        console.log(v);
      });
      location.href = '/#/system/common';
      setTimeout(() => {
        location.reload();
      }, 30);
      // form.resetFields();
    });
  };

  render() {
    const { isEdit } = this.state;

    return (
      <PageHeaderLayout title="评价管理">
        <Card>
          <Tabs
            tabBarExtraContent={
              isEdit ? (
                <div>
                  <Button type="primary" style={{ marginRight: 10 }} onClick={this.save}>
                    保存
                  </Button>
                  <Button>取消</Button>
                </div>
              ) : (
                <Button type="primary" href="#/system/common?edit=true" target="_blank">
                  修改评价
                </Button>
              )
            }
          >
            <TabPane tab="置换-确认收货" key="1">
              <RowV>
                <Col span={8}>评价标题</Col>
                <Col span={8}>评价方</Col>
                <Col span={8}>评价选项</Col>
              </RowV>

              <RowV>
                <Col span={8}>
                  {isEdit
                    ? this.props.form.getFieldDecorator(`reply_speed`, {
                        initialValue: '对方回复速度',
                      })(<Input style={{ width: '80%', marginBottom: 10 }} />)
                    : '对方回复速度'}
                </Col>
                <Col span={8}>
                  {isEdit
                    ? this.props.form.getFieldDecorator(`reply_speed_side`, {
                        initialValue: 1,
                      })(
                        <RadioGroup>
                          <Radio style={radioStyle} value={1}>
                            发布方
                          </Radio>
                          <Radio style={radioStyle} value={2}>
                            申请方
                          </Radio>
                          <Radio style={radioStyle} value={3}>
                            双方
                          </Radio>
                        </RadioGroup>
                      )
                    : '发布方'}
                </Col>
                <Col span={8}>
                  {['回复速度很快', '回复速度一般', '回复速度很慢'].map((item, index) => {
                    return isEdit ? (
                      this.props.form.getFieldDecorator(`reply_speed-${index}`, {
                        initialValue: item,
                      })(<Input key={item} style={{ width: '80%', marginBottom: 10 }} />)
                    ) : (
                      <div key={item}>{item}</div>
                    );
                  })}
                </Col>
              </RowV>

              <RowV>
                <Col span={8}>
                  {isEdit
                    ? this.props.form.getFieldDecorator(`trust_degree`, {
                        initialValue: '对方态度',
                      })(<Input style={{ width: '80%', marginBottom: 10 }} />)
                    : '对方态度'}
                </Col>
                <Col span={8}>
                  {isEdit
                    ? this.props.form.getFieldDecorator(`trust_degree_side`, {
                        initialValue: 1,
                      })(
                        <RadioGroup>
                          <Radio style={radioStyle} value={1}>
                            发布方
                          </Radio>
                          <Radio style={radioStyle} value={2}>
                            申请方
                          </Radio>
                          <Radio style={radioStyle} value={3}>
                            双方
                          </Radio>
                        </RadioGroup>
                      )
                    : '发布方'}
                </Col>
                <Col span={8}>
                  {['态度很好', '态度一般', '态度不怎么好'].map((item, index) => {
                    return isEdit ? (
                      this.props.form.getFieldDecorator(`trust_degree-${index}`, {
                        initialValue: item,
                      })(<Input key={item} style={{ width: '80%', marginBottom: 10 }} />)
                    ) : (
                      <div key={item}>{item}</div>
                    );
                  })}
                </Col>
              </RowV>

              <RowV>
                <Col span={8}>
                  {isEdit
                    ? this.props.form.getFieldDecorator(`manner`, {
                        initialValue: '对对方的信任度',
                      })(<Input style={{ width: '80%', marginBottom: 10 }} />)
                    : '对对方的信任度'}
                </Col>
                <Col span={8}>
                  {isEdit
                    ? this.props.form.getFieldDecorator(`manner_side`, {
                        initialValue: 1,
                      })(
                        <RadioGroup>
                          <Radio style={radioStyle} value={1}>
                            发布方
                          </Radio>
                          <Radio style={radioStyle} value={2}>
                            申请方
                          </Radio>
                          <Radio style={radioStyle} value={3}>
                            双方
                          </Radio>
                        </RadioGroup>
                      )
                    : '发布方'}
                </Col>
                <Col span={8}>
                  {['90%', '90%', '90%'].map((item, index) => {
                    return isEdit ? (
                      this.props.form.getFieldDecorator(`value-manner-${index}`, {
                        initialValue: item,
                      })(<Input key={index} style={{ width: '80%', marginBottom: 10 }} />)
                    ) : (
                      <div key={index}>{item}</div>
                    );
                  })}
                </Col>
              </RowV>
            </TabPane>
            <TabPane tab="..." key="2">
              Content of tab 2
            </TabPane>
          </Tabs>
        </Card>
      </PageHeaderLayout>
    );
  }
}
