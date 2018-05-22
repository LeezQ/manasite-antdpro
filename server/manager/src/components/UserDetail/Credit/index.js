import React, { Component } from 'react';  
import { 
  Row,
  Col, 
  Card, 
  Rate,
} from 'antd';  
import DescriptionList from 'components/DescriptionList';
import styles from './index.less' 

const { Description } = DescriptionList;   

export default class Credit extends Component{ 
    render(){
        const {stats} = this.props;  
        return(  
          <Row>
            <Col span={4} offset={0} >
              <Card title="信誉值" className={styles.card} style={{ marginBottom: 24 }} bordered={false}>  
                <DescriptionList col="2"> 
                  {
                  stats.hasOwnProperty('credit')?
                    <Rate disabled defaultValue={stats.credit} style={{height:46}} />:
                  '无'
                } 
                </DescriptionList> 
              </Card>
            </Col>
            <Col span={4} offset={0}>
              <Card title="芝麻信用" className={styles.card} style={{ marginBottom: 24 }} bordered={false}>  
                <DescriptionList col="2">
                  <Description > 
                    <h3>{stats.hasOwnProperty('zhima_credit')?stats.zhima_credit:'无'}</h3>
                  </Description>
                </DescriptionList> 
              </Card> 
            </Col>
          </Row>
        )
    }
}