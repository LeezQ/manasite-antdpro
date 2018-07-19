import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import EditSourceForm from 'components/System/EditSourceForm.js';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Source.less';
import { source } from '../../services/system';

@connect(({ system, loading }) => ({
  system,
  loading: loading.models.system,
}))
@Form.create()
export default class Source extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sourceData: {},
      visible: false,
    };
  }

  componentDidMount() {
    // source().then(data => {
    //   if (data.status === 'ok') {
    //     // this.setState({ sourceData: data.data.list });
    //   }
    // });
  }

  showEdit = id => {
    console.log(id);
    this.setState({
      visible: true,
    });
  };

  render() {
    return (
      <PageHeaderLayout title="资源管理">
        <Card bordered={false}>
          <div className={styles.wrap}>
            <div>
              <h2 className={styles.title}>一级菜单</h2>
              <ul>
                <li className={styles.current}>
                  一级菜单{' '}
                  <a href="javascript:;" onClick={() => this.showEdit()}>
                    编辑
                  </a>
                </li>
                <li>
                  一级菜单{' '}
                  <a href="javascript:;" onClick={() => this.showEdit()}>
                    编辑
                  </a>
                </li>
                <li>
                  一级菜单{' '}
                  <a href="javascript:;" onClick={() => this.showEdit()}>
                    编辑
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={styles.title}>一级菜单</h2>
              <ul>
                <li>
                  一级菜单{' '}
                  <a href="javascript:;" onClick={() => this.showEdit()}>
                    编辑
                  </a>
                </li>
                <li>
                  一级菜单{' '}
                  <a href="javascript:;" onClick={() => this.showEdit()}>
                    编辑
                  </a>
                </li>
                <li>
                  一级菜单{' '}
                  <a href="javascript:;" onClick={() => this.showEdit()}>
                    编辑
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Card>
        <EditSourceForm
          visible={this.state.visible}
          data={this.state.sourceData}
          onCancel={() => {
            this.setState({ visible: false });
          }}
        />
      </PageHeaderLayout>
    );
  }
}
