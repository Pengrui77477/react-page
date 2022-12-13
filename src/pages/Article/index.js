import { Card, Breadcrumb, Form, Radio, Select, Button, DatePicker, Table, Tag, Space, Popconfirm, message } from 'antd'
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import 'dayjs/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'

import img404 from '@/assets/404.jpg'
// import someImg from '@/assets/logo-social.png'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
import { history } from '@/utils/history'

function Article() {

  const [channelList, setChannelList] = useState([]);
  //文章列表统一管理
  const [articleData, setarticleData] = useState({
    list: [],
    count: 0
  });
  //文章参数管理
  const [params, setParams] = useState({
    page: 1,
    per_page: 10
  })

  //依赖不同，不能写到同一个useEffect中
  useEffect(() => {
    const loadChannelList = async () => {
      const res = await http.get('/channels')
      setChannelList(res.data.channels)
    }
    loadChannelList()
  }, [])
  useEffect(() => {
    const loadList = async () => {
      const res = await http.get('/mp/articles', { params })
      const { results, total_count } = res.data
      setarticleData({
        list: results,
        count: total_count
      })
    }
    loadList()
  }, [params])

  const delArticle = async (data) => {
    console.log(data);
    await http.delete(`/mp/articles/${data.id}`)
    message.success('删除成功')
    setParams({
      ...params,
      per_page: 10
    })
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={()=>{history.push(`/publish?id=${data.id}`)}}
            />
            <Popconfirm title="确认删除？" onConfirm={() => { delArticle(data) }}>
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              // onClick={() => { }}
              />
            </Popconfirm>

          </Space>
        )
      }
    }
  ]

  const onFinish = (value) => {
    const { channel_id, date, status } = value;
    const _params = {};
    if (status !== -1) {
      _params.status = status;
    }
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD');
      _params.end_pubdate = date[1].format('YYYY-MM-DD');
    }
    setParams({ ...params, ..._params })
  }
  const pageChange = (page) => {
    setParams({
      ...params,
      page
    })
  }
  return (
    <div>
      {/* 筛选区域 */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to='/home'>首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          onFinish={onFinish}
          initialValues={{ status: -1 }}
        >
          <Form.Item label="状态" name='status'>
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channelList.map(channel =>
                <Select.Option value={channel.id} key={channel.id}>{channel.name}</Select.Option>
              )}
              {/* <Select.Option value='jack'>Jack</Select.Option> */}
              {/* <Select.Option value='lucy'>Lucy</Select.Option> */}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            <DatePicker.RangePicker locale={locale}></DatePicker.RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 文章列表区域 */}
      <Card title={`根据筛选条件共查询到 ${articleData.count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articleData.list}
          pagination={{
            pageSize: params.per_page,
            total: articleData.count,
            onChange: pageChange
          }}
        />
      </Card>
    </div>
  )
}

export default Article