import { Card, Col, Row, Statistic, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment } from 'react';

import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import numeral from 'numeral';
import { TagCloud, WaterWave } from '@/components/Charts';
import { ChartStateType } from '@/models/chart';

import styles from './index.less';

const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

interface ChartProps {
  chart: ChartStateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

@connect(
  ({
    chart,
    loading,
  }: {
    chart: ChartStateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    chart,
    loading: loading.models.chart,
  }),
)
class Chart extends Component<ChartProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchTags',
    });
  }

  render() {
    const { chart, loading } = this.props;
    const { tags } = chart;

    return (
      <GridContent>
        <Fragment>
          <Row gutter={24}>
            <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card title="网站访客分布" bordered={false}>
                <Row>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic title="总访客数" suffix="元" value={numeral(659).format('0,0')} />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic title="完整访问率" value="92%" />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Countdown title="活动剩余时间" value={deadline} format="D 天 H 时 m 分 s 秒" />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic title="每天访客数" suffix="人" value={numeral(20).format('0,0')} />
                  </Col>
                </Row>
                <div className={styles.mapChart}>
                  <Tooltip title="待开发....">
                    <img
                      src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                      alt="map"
                    />
                  </Tooltip>
                </div>
              </Card>
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <Card
                title="热门搜索"
                bordered={false}
                loading={loading}
                bodyStyle={{ overflow: 'hidden' }}
              >
                <TagCloud data={tags || []} height={161} />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              线形图....
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <Card
                title="资源剩余"
                bordered={false}
                bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              >
                <WaterWave title="打赏资金剩余" percent={32} height={161} />
              </Card>
            </Col>
          </Row>
        </Fragment>
      </GridContent>
    );
  }
}

export default Chart;