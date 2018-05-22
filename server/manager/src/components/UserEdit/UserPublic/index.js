import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import {
    Row,
    Col,
    Icon,
    Card,
    Tabs,
    Table,
    Radio,
    DatePicker,
    Tooltip,
    Menu,
    Dropdown,
} from 'antd';

class UserPublic extends Component{

    state = {
        publicType: 'exchange', 
      };
    
    handleChangeSalesType = e => {
        this.setState({
            publicType: e.target.value,
        });
      };

    render(){
        const {publicType} =this.state
        const {loading } = this.props;
        return( 
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.publicCard}
              bordered={false} 
              bodyStyle={{ padding: 24 }}
              extra={
                <div className={styles.publicCardExtra}> 
                  <div className={styles.publicTypeRadio}>
                    <Radio.Group value={publicType} onChange={this.handleChangeSalesType}>
                      <Radio.Button value="exchange">置换</Radio.Button>
                      <Radio.Button value="active">活动</Radio.Button>
                      <Radio.Button value="share">分享</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              }
              style={{ marginTop: 24, minHeight: 509 }}
            />
          </Col>
        )
    }
}

export default UserPublic