import React, { Component } from 'react'; 
import { Rate,Card,Row,Col,Tag} from 'antd'; 
import { connect } from 'dva';
import numeral from 'numeral';
import NumberInfo from 'components/NumberInfo';

class UserData extends Component{

    state={

    } 
    render(){ 
        const gridStyle = {
            width: '25%',
            textAlign: 'center',
          };
        return( 
          <div>
            <Row gutter={24}>
              <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                <Card title="社交数据" bordered={false}> 
                  <Card.Grid style={gridStyle}> 
                    <NumberInfo
                      subTitle="关注人数" 
                      total={<a href="#">23320</a>}
                    />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}> 
                    <NumberInfo
                      subTitle="被关注数" 
                      total={<a href="#">33220</a>}
                    />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}> 
                    <NumberInfo
                      subTitle="特殊关注人" 
                      total={<a href="#">320</a>}
                    />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}> 
                    <NumberInfo
                      subTitle="收到的赞" 
                      total={<a href="#">3420</a>}
                    />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}> 
                    <NumberInfo
                      subTitle="被转发量" 
                      total={<a href="#">311220</a>}
                    />
                  </Card.Grid>
                </Card>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                <Card title="发布数据" bordered={false}>
                  <Card.Grid style={gridStyle}> 
                    <NumberInfo
                      subTitle="发布的置换" 
                      total={<a href="#">3320</a>}
                    />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}> 
                    <NumberInfo
                      subTitle="发起的置换已成功" 
                      total={<a href="#">3320</a>}
                    />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}> 
                    <NumberInfo
                      subTitle="发布的置换已成功" 
                      total={<a href="#">3320</a>}
                    />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}> 
                    <NumberInfo
                      subTitle="发布的活动" 
                      total={<a href="#">3320</a>}
                    />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}> 
                    <NumberInfo
                      subTitle="参加的活动" 
                      total={<a href="#">3320</a>}
                    />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}> 
                    <NumberInfo
                      subTitle="发布的分享" 
                      total={<a href="#">3320</a>}
                    />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}> 
                    <NumberInfo
                      subTitle="收藏数量" 
                      total={<a href="#">3320</a>}
                    />
                  </Card.Grid>
                </Card>
              </Col>
            </Row>
          </div>
        )
    }
}

export default UserData