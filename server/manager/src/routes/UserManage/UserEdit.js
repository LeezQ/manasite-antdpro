import React, {PureComponent} from 'react';
import {
  Card,
  Button,
  Badge,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  Avatar,
  Input,
  Select,
  Popover,
  Tabs
} from 'antd';

import {connect} from 'dva';
import FooterToolbar from 'components/FooterToolbar';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';
import {routerRedux} from "dva/router";

const TabPane = Tabs.TabPane;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {Description} = DescriptionList;

class UserEdit extends PureComponent {
  state = {
    width: '100%',
  };

  handleTabChange = key => {
    const {dispatch, match} = this.props;
    switch (key) {
      case 'articles':
        dispatch(routerRedux.push(`${match.url}/articles`));
        break;
      case 'applications':
        dispatch(routerRedux.push(`${match.url}/applications`));
        break;
      case 'projects':
        dispatch(routerRedux.push(`${match.url}/projects`));
        break;
      default:
        break;
    }
  };

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const {match, routerData, location, form, dispatch, submitting, currentUser = {}} = this.props;
    const {getFieldDecorator, validateFieldsAndScroll, getFieldsError} = form;

    let contactInfo = {};
    if (contactInfo.contact) {
      contactInfo.contact.forEach(function(element)
      {
        contactInfo[element.type||0] = element;
      });
    }

    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          dispatch({
            type: 'form/submitAdvancedForm',
            payload: values,
          });
        }
      });
    };

    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }

      const scrollToField = fieldKey => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };

      const errorList = Object.keys(errors).map(key => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon}/>
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        );
      });

      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle"/>
          </Popover>
          {errorCount}
        </span>
      );
    };

    return (
      <PageHeaderLayout
        title="会员档案"
        wrapperClassName={styles.advancedForm}
      >
        <Tabs style={{backgroundColor: '#ffffff'}} defaultActiveKey="1" onChange={this.handleTabChange}>
          <TabPane style={{backgroundColor: 'rgb(240, 242, 245)'}} tab="会员信息" key="general">
            <Card title="基本信息" className={styles.card} style={{ marginBottom: 24 }} bordered={false}>
              <Row>
                <Col span={"12"}>
                  <DescriptionList col={"2"}>
                    <Description term="芥摩号">{currentUser.uid}</Description>
                    <Description style={{display: 'flex'}}>
                      <Avatar shape="square" size="large" className={styles.avatar} src={currentUser.avatar} />
                    </Description>
                  </DescriptionList>
                  <DescriptionList col={"1"}>
                    <Description term="昵称">{currentUser.nickname}</Description>
                    <Description term="手机号">{currentUser.mobile}</Description>
                    <Description term="性别">{currentUser.gender}</Description>
                    <Description term="姓名">{currentUser.name}</Description>
                    <Description term="身份证号">{currentUser.idcardno}</Description>
                    <Description term="职业">{currentUser.jobs ? currentUser.jobs.join(', ') : ''}</Description>
                    <Description term="公司">{currentUser.companies ? currentUser.companies.join(', ') : ''}</Description>
                  </DescriptionList>
                </Col>
                <Col span={"11"} offset={1}>
                  <Row><span style={{fontWeight: 'bold'}}>{"三方平台账号"}</span></Row>
                  <DescriptionList col={"1"} style={{marginLeft: 20, marginTop: 20}}>
                    <Description term="微信ID">{contactInfo[1] ? contactInfo[1].account : ''}</Description>
                    <Description term="微信昵称">{contactInfo[1] ? contactInfo[1].nickname : ''}</Description>
                    <Description term="微博账号">{contactInfo[2] ? contactInfo[1].account : ''}</Description>
                    <Description term="微博昵称">{contactInfo[2] ? contactInfo[1].nickname : ''}</Description>
                    <Description term="QQ">{contactInfo[3] ? contactInfo[3].account : ''}</Description>
                    <Description term="QQ昵称">{contactInfo[3] ? contactInfo[3].nickname : ''}</Description>
                  </DescriptionList>
                </Col>
              </Row>
            </Card>
            <Card title="地址信息" style={{ marginBottom: 24 }} className={styles.card} bordered={false}>
              <DescriptionList col={"1"}>
                <Description term="所在位置"></Description>
                <Description term="默认收货地址"></Description>
                <Description term="收货地址1"></Description>
                <Description term="收货地址2"></Description>
              </DescriptionList>
              {
              }
            </Card>
            <Card title="兴趣频道" className={styles.card} bordered={false}>
              <Badge count={'脱口秀'} style={{ backgroundColor: '#52c41a', marginRight: 10 }} />
              <Badge count={'幽默'} style={{ backgroundColor: '#52c41a', marginRight: 10 }} />
              <Badge count={'街头艺人'} style={{ backgroundColor: '#52c41a', marginRight: 10 }} />
            </Card>
          </TabPane>
          <TabPane tab="会员信用" key="credit">
            <div>暂无数据</div>
          </TabPane>
          <TabPane tab="会员数据" key="userstat">
            <div>暂无数据</div>
          </TabPane>
          <TabPane tab="会员发布" key="useredata">
            <div>暂无数据</div>
          </TabPane>
        </Tabs>
      </PageHeaderLayout>
    );
  }
}

export default connect(({user, global, loading}) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  submitting: loading.effects['form/submitAdvancedForm'],
}))(Form.create()(UserEdit));
