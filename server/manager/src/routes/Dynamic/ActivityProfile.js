import React, { PureComponent,Fragment} from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider,Row,Col } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './index.less';

const { Description } = DescriptionList;

const progressColumns = [{
  title: '时间',
  dataIndex: 'time',
  key: 'time',
}, {
  title: '当前进度',
  dataIndex: 'rate',
  key: 'rate',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render: text => (
    text === 'success' ? <Badge status="success" text="成功" /> : <Badge status="processing" text="进行中" />
  ),
}, {
  title: '操作员ID',
  dataIndex: 'operator',
  key: 'operator',
}, {
  title: '耗时',
  dataIndex: 'cost',
  key: 'cost',
}];

@connect(({ dynamic, loading }) => ({
    dynamic,
    loading: loading.models.dynamic,
}))

export default class ActivityProfile extends PureComponent {
  componentDidMount() {
      const {id} = this.props.match.params;
      const {dispatch} = this.props;
      dispatch({
        type: 'dynamic/profileActivity',
        payload:{
          id:id
        }
      });
  }

  render() {
    const { dynamic:{info={}},loading, form } = this.props;
    const  {userinfo={},general={},channels,comments,stat} = info;
    const  {exchange={}} = general;

    const commentColumns = [{
      title: '用户ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '用户昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    }, {
      title: '评论内容',
      dataIndex: 'comment',
      key: 'comment',
    }, {
      title: '发表时间',
      dataIndex: 'create_at',
      key: 'create_at',
    }];
    return (
      <PageHeaderLayout title="活动详情">
        <Card bordered={false}>
          <DescriptionList size="large" title="发布人信息" style={{ marginBottom: 32 }}>
            <Description term="发布人">{userinfo.nickname}</Description>
            <Description term="所在地">{userinfo.location && userinfo.location.province}</Description>
            <Description term="发布时间">{info.created_at}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="置换物信息" style={{ marginBottom: 32 }}>
            <Description term="标题">{exchange.title}</Description>
            <Description term="所属频道">{channels && channels.map(item=>{
                return item.name
            })}</Description>
            <Description term="物品">{exchange.exchange_for && exchange.exchange_for.join(",")}</Description>
            <Description term="价格">{exchange.price==2?"高价区":"中价区"}</Description>
            <Description term="交换方式">{["","快递物流","见面交换","可以海外交换"][exchange.exchange_mode]}</Description>

            <Description term="状态">
              {["","默认","已确认","已拒绝","已取消","押金已付","已发货","已收货","已评价","存在争议待处理"][exchange.state]}
            </Description>
          <div className={styles.title}>物品信息</div>
          <Row>
            {
                general.media && general.media.map(item=>
                    <div className={styles.image_cover}>
                        <img src={item.url}/>
                    </div>
                )
            }
          </Row>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>评价列表</div>
          <Table
            style={{ marginBottom: 16,marginTop:10 }}
            pagination={false}
            loading={loading}
            dataSource={comments && comments.records}
            columns={commentColumns}
            rowKey={item => item.id}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
