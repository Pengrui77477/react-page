import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { useEffect, useState, useRef } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { http } from '@/utils'

const { Option } = Select

const Publish = () => {
  const [channelList, setChannelList] = useState([]);
  const [fileList, setFileList] = useState([])
  const [imgCount, setImgCount] = useState(1);

  const cacheImgList = useRef();

  useEffect(() => {
    const loadChannelList = async () => {
      const res = await http.get('/channels')
      setChannelList(res.data.channels)
    }
    loadChannelList()
  }, [])
  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);
    
    //将图片存入缓存仓库
    cacheImgList.current = fileList
  }
  const onRadioChange = ({ target }) => {
    setImgCount(target.value)
    //取出对应数量的图片
    if (target.value === 1 && cacheImgList.current) {
      const img = cacheImgList.current[0]
      setFileList([img])

    } else if (target.value === 3 ) {
      setFileList(cacheImgList.current)
    }
    console.log(fileList);
  }
  const onFinish = async value => {
    const { channel_id, content, title, type } = value;

    console.log(fileList);
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type,
        images: fileList.map(file => file.response.data.url)
      }
    }
    try {
      await http.post('/mp/articles?draft=false', params);
      message.success('发布成功！')
    } catch (err) {
      console.log(err);
      message.error('发布失败')
    }
  }

  //编辑功能
  


  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map(channel => <Option value={channel.id} key={channel.id}>{channel.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onRadioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}

          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill theme='snow' ></ReactQuill>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish