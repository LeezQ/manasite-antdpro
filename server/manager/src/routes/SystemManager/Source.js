import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Button, message } from 'antd';
import EditSourceForm from 'components/System/EditSourceForm.js';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Source.less';

import { getMenu, deleteMenu } from '../../services/system';

@connect(({ system, loading }) => ({
  system,
  loading: loading.models.system,
}))
@Form.create()
export default class Source extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      visible: false,
      currentItem: {},
    };
  }

  componentDidMount() {
    // source().then(data => {
    //   if (data.status === 'ok') {
    //     // this.setState({ sourceData: data.data.list });
    //   }
    // });
    this.loadData();
  }

  loadData = () => {
    getMenu({ list_all: true }).then(data => {
      if (data) {
        this.setState({
          data: data.data,
        });
      }
    });
  };

  showEdit = item => {
    this.setState({
      visible: true,
      currentItem: item,
    });
  };

  createMenu = () => {
    this.setState({
      visible: true,
    });
  };

  onSave = () => {
    this.setState(
      {
        visible: false,
      },
      () => {
        this.loadData();
      }
    );
  };

  delete = item => {
    deleteMenu(item.id).then(() => {
      message.success('删除成功');
      this.loadData();
    });
  };

  renderItems = (data, current, dom = [], n = 1) => {
    dom.push(
      <div key={data[current].id}>
        <h2 className={styles.title}>{n}级菜单</h2>
        <ul>
          {data.map(item => {
            return (
              <li key={item.id}>
                {item.name}
                <a
                  href="javascript:;"
                  onClick={() => this.showEdit(item)}
                  style={{ marginLeft: 3, fontSize: 12 }}
                >
                  编辑
                </a>
                <a href="javascript:;" onClick={() => this.delete(item)} style={{ fontSize: 12 }}>
                  删除
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
    if (data[current].sub_menus.length <= 0) {
      return dom;
    } else {
      return this.renderItems(data[current].sub_menus, 0, dom, ++n);
    }
  };

  render() {
    const { data, currentItem } = this.state;
    return (
      <PageHeaderLayout title="资源管理">
        <Card bordered={false}>
          <Button
            type="primary"
            onClick={() => {
              this.createMenu();
            }}
            style={{ marginBottom: 12 }}
          >
            创建菜单
          </Button>
          <div className={styles.wrap}>{data.length > 0 && this.renderItems(data, 0)}</div>
        </Card>
        <EditSourceForm
          visible={this.state.visible}
          currentItem={currentItem}
          onCancel={() => {
            this.setState({ visible: false });
          }}
          onSave={() => {
            this.onSave();
          }}
        />
      </PageHeaderLayout>
    );
  }
}
