import React, { Component } from 'react'; 
import { Rate,Card,Row,Col,Tag} from 'antd'; 
import { connect } from 'dva';
import numeral from 'numeral';
import NumberInfo from 'components/NumberInfo';

class Credit extends Component{

    state={

    } 
    render(){
        return( 
            <Row gutter={24}>
                <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                    <Card  bordered={false}>
                    <Row>
                        <Col md={6} sm={12} xs={24}>
                        <NumberInfo
                            subTitle="信誉值"  
                            total={<Rate disabled defaultValue="5" />}
                        />
                        </Col> 
                        <Col md={6} sm={12} xs={24} style={{ marginLeft: 24 }}>
                        <NumberInfo
                            subTitle="芝麻信用"  
                            total={<h2>660</h2>}
                        />
                        </Col> 
                    </Row>
                    </Card>
                </Col>
              </Row> 
        )
    }
}

export default Credit