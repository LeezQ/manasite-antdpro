import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Card, Tabs, Button, Table, Input, message } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { dictionaries, saveDictionaries } from '../../services/system';

const TabPane = Tabs.TabPane;

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
      isEdit: window.location.toString().indexOf('edit=true') < 0,
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
    const id = 1;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      message.success('保存成功');
      // saveDictionaries(values, id).then(data => {
      //   console.log(data);
      // });
      location.href = '/#/system/common';
      setTimeout(() => {
        location.reload();
      }, 30);
      form.resetFields();
    });
  };

  render() {
    const dataSource = [
      {
        key: '1',
        title: '对方的回复速度',
        user: '双方',
        info: ['回复速度很快', '回复速度一般', '回复速度很慢'],
      },
      {
        key: '2',
        title: '对方的态度',
        user: '双方',
        info: ['态度很好', '态度一般', '态度不怎么好'],
      },
      {
        key: '3',
        title: '对方的信任感',
        user: '双方',
        info: ['90%', '60%', '30%'],
      },
    ];

    const { isEdit } = this.state;

    const columns = [
      {
        title: '评价标题',
        dataIndex: 'title',
        width: 200,
        render: (_, row) => {
          return isEdit ? (
            <div>{row.title}</div>
          ) : (
            this.props.form.getFieldDecorator(`title-${row.key}`, {
              initialValue: row.title,
            })(<Input style={{ width: 200, marginBottom: 10 }} />)
          );
        },
      },
      {
        title: '评价方',
        key: 'user',
        width: 300,
        render: (_, row) => {
          return isEdit ? (
            <div>{row.user}</div>
          ) : (
            this.props.form.getFieldDecorator(`user-${row.key}`, {
              initialValue: row.user,
            })(<Input style={{ width: 300, marginBottom: 10 }} />)
          );
        },
      },
      {
        title: '排位：评价选项',
        key: 'info',
        width: 400,
        render: row => {
          return row.info.map((item, index) => {
            return isEdit ? (
              <div key={item}>{item}</div>
            ) : (
              this.props.form.getFieldDecorator(`common-${row.key}-${index}`, {
                initialValue: item,
              })(<Input key={item} style={{ width: 400, marginBottom: 10 }} />)
            );
          });
        },
      },
    ];

    return (
      <PageHeaderLayout title="评价管理">
        <Card>
          <Tabs
            tabBarExtraContent={
              isEdit ? (
                <Button type="primary" href="#/system/common?edit=true" target="_blank">
                  修改评价
                </Button>
              ) : (
                <div>
                  <Button type="primary" style={{ marginRight: 10 }} onClick={this.save}>
                    保存
                  </Button>
                  <Button>取消</Button>
                </div>
              )
            }
          >
            <TabPane tab="置换-确认收货" key="1">
              <Table
                dataSource={dataSource}
                rowKey={record => record.title}
                columns={columns}
                pagination={false}
              />
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
