import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import {Form, Input, Modal, Select, Table, DatePicker, message} from 'antd'
import {UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import axios from 'axios'
import Spinner from '../components/Spinner'
import Analytics from '../components/Analytics'
const {RangePicker} = DatePicker;
const moment = require('moment');

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');
  const [editable, setEditable] = useState(null);

  const columns = [
    {
      title:"Date",
      dataIndex:"date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title:"Amount",
      dataIndex:"amount",
    },
    {
      title:"Type",
      dataIndex:"type",
    },
    {
      title:"Category",
      dataIndex:"category",
    },
    {
      title:"Reference",
      dataIndex:"refrence",
    },
    {
      title:'Actions',
      render:(text,record)=>(
        <div>
          <EditOutlined onClick={() => {setEditable(record); setShowModal(true);}}></EditOutlined>
          <DeleteOutlined className='mx-2' onClick={() => handleDelete(record)}></DeleteOutlined>
        </div>
      )
    },
  ];

  useEffect(() => {
    const getAllTransaction = async() => {
      try{
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        const res = await axios.post('/api/transaction/getalltransaction', {userid:user._id, frequency, selectedDate, type});
        setAllTransaction(res.data);
        console.log(res.data);
        setLoading(false);
      }
      catch(error){
        console.log(error);
        message.error("Fetch Issue With Tranction");
      }
    };
    getAllTransaction();
  }, [frequency, selectedDate, type, setAllTransaction]);
  
  const handleSubmit = async (values) => {
    try{
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);

      if(editable){
        await axios.post('/api/transaction/edittransaction', {
          payload:{
            ...values,
            userid:user._id,
          },
          transactionId:editable._id
        })
        message.success("Transaction Updated Successfully");
      }
      else{
        await axios.post('/api/transaction/addtransaction',{...values, userid:user._id});
        message.success("Transaction Added Successfully");
      }
      setLoading(false);
      setShowModal(false);
      setEditable(null);
    }
    catch(error){
      setLoading(false);
      console.log(error)
    }
  }

  const handleDelete = async(record) => {
    try{
      setLoading(true);
      await axios.post('/api/transaction/deletetransaction',{
        transactionId:record._id,
      })
      message.success("Transaction Deleted!");
      setLoading(false);
    }
    catch(error){
      setLoading(false);
      message.error("Unable to delete");
      console.log(error);
    }
  }

  return (
    <Layout>
      {loading && <Spinner></Spinner>}
      <div className='filters'>
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values)=> setFrequency(values)}>
            <Select.Option value='7'>Last 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {frequency === 'custom' && (
            <RangePicker value={selectedDate} onChange={(values)=>setSelectedate(values)}/>
          )}
        </div>
        <div>
          <h6>Select Type</h6>
            <Select value={type} onChange={(values)=> setType(values)}>
              <Select.Option value='all'>All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
        </div>
        <div className='switch-icons'>
          <UnorderedListOutlined className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`} onClick={() => setViewData('table')}></UnorderedListOutlined>
          <AreaChartOutlined className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`} onClick={() => setViewData('analytics')}></AreaChartOutlined>
        </div>
        <div>
          <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add Transaction</button>
        </div>
      </div>
      <div className='content'>
        {viewData==='table'
          ?(
            <Table columns={columns} dataSource={allTransaction}/>
          )
          :(
            <Analytics allTransaction={allTransaction}/>
          )
        }
      </div>
      <Modal title={editable?'Edit Transaction':'Add Transaction'} open={showModal} onCancel={() => setShowModal(false)} footer={false}>
          <Form layout='vertical' onFinish={handleSubmit} initialValues={editable}>
              <Form.Item label="Amount" name="amount">
                  <Input type='text' required/>
              </Form.Item>
              <Form.Item label='Type' name='type'>
                  <Select>
                    <Select.Option value='income'>Income</Select.Option>
                    <Select.Option value='expense'>Expense</Select.Option>
                  </Select>
              </Form.Item>
              <Form.Item label='Category' name='category'>
                <Select>
                  <Select.Option value='salary'>Salary</Select.Option>
                  <Select.Option value="tip">Tip</Select.Option>
                  <Select.Option value="project">Project</Select.Option>
                  <Select.Option value="food">Food</Select.Option>
                  <Select.Option value="movie">Movie</Select.Option>
                  <Select.Option value="bills">Bills</Select.Option>
                  <Select.Option value="medical">Medical</Select.Option>
                  <Select.Option value="fee">Fee</Select.Option>
                  <Select.Option value="tax">Tax</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label='Date' name='date'>
                  <Input type='date'/>
              </Form.Item>
              <Form.Item label="Refrence" name="refrence">
                <Input type="text" required />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input type="text" required />
              </Form.Item>
              <div className='d-flex justify-content-center'>
                <button type='submit' className='btn btn-primary'>Save</button>
              </div>
          </Form>
      </Modal>
    </Layout>
  )
}

export default HomePage
