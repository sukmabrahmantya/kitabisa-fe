import React, { useEffect , useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCampaign, changeSorted } from './store/campaign'
import { useIsMount } from './useIsMount.jsx'
import { Layout, Card, Row, Col, Progress, Select, Typography } from 'antd';
import NumberFormat from 'react-number-format';

const App = () => {
  const dispatch = useDispatch();
	const isMount = useIsMount();
  const { data } = useSelector(state => state.campaign);
	const [sorted, setSorted] = useState('default');

  useEffect(() => {
    if (isMount) dispatch(getCampaign());
    else console.log('Subsequent Render');
  }, []);

  useEffect(() => {
    dispatch(changeSorted(sorted));
  }, [sorted]);

  const handleChange = (value) => {
    setSorted(value);
  };

  return (
    <Layout style={{ minHeight: '100vh', padding: '2rem' }}>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={{span: 6, offset: 18}} lg={{span: 4, offset: 20}}>
          <Select value={sorted} style={{ width: '100%' }} onChange={handleChange}>
            <Select.Option value="default">Default</Select.Option>
            <Select.Option value="donation_goal">Sorting by Donation Goal</Select.Option>
            <Select.Option value="days_left">Sorting by Days Left</Select.Option>
          </Select>
        </Col>
        {data.map(camp =>
          <Col key={camp.id} xs={24} sm={12} md={8} lg={6}>
            <Card hoverable cover={<img alt="example" src={camp.image} />}>
              <Card.Meta title={camp.title} />
              <Progress percent={camp.donation_percentage} strokeColor={camp.donation_percentage < 100 ? "gray" : "pink"} showInfo={false} style={{ padding: '10px 0' }} />
              <Row justify="space-between">
                <Col span={12}> {camp.donation_received !== 0 ? 'Terkumpul' : ''}</Col>
                <Col span={12} style={{ textAlign: 'end' }}>Sisa hari</Col>
                <Col span={12}>
                  {camp.donation_received !== 0 ? 
                    <NumberFormat
                      value={camp.donation_received}
                      displayType="text"
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="Rp. "
                    /> : ''
                  }
                </Col>
                <Col span={12} style={{ textAlign: 'end' }}>{ camp.days_remaining }</Col>
              </Row>
            </Card>
          </Col>)
        }
      </Row>
    </Layout>
  )
}

export default App;