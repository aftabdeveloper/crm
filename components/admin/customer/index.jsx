import React, { useState ,useMemo ,useEffect } from 'react';
import { Button, Drawer , Form ,Input, Divider, Space, notification,DatePicker,Modal,Alert } from 'antd';
import { UserOutlined , MobileOutlined} from '@ant-design/icons';
import Link from 'next/link';
import Admin from ".."
const Context = React.createContext({
    name: 'Default',
  });
  const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const Customer = ()=>{
    const [open, setOpen] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modelData , setModalData] = useState([{}]);

    {/* timer coding */}
    useEffect(() => {
      let timer;

      if(running) {
        timer = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
      } 
      else {
        clearInterval(timer);
      }
  
      return () => {
        clearInterval(timer);
      };
    }, [running ,seconds]);
  
    const stopTimer = ()=>{
     setRunning(false);
     setSeconds(0)
    };
{/*Drawer codsing */}
    const showDrawer = ()=>{
      setOpen(true);
    };
    const onClose = ()=>{
      setOpen(false);
    };
    
    {/*notification */}
    const [api, contextHolder] = notification.useNotification();
    const contextValue = useMemo(
        () => ({
          name: 'Ant Design',
        }),
        [],
      );
      const openNotification = (placement, values) => {
        api.info({
          description: (
            <Context.Consumer>
              {({ name }) => (
                <div className="rounded-m my-5">
                    <div className="flex justify-between">
                    <p className="text-blue-700">Name: {values.name}</p>
                    <p className="text-blue-700"><MobileOutlined className='text-black text-xl' /> {values.mobile}</p>
                    </div>
                    <p className="text-blue-700">Email: {values.email}</p>

                  <h1 className="text-black">Timer: {seconds} seconds</h1>
                 
                <div className='flex justify-around mt-9'>
                <Button onClick={stopTimer} className='bg-red-600 text-white hover:bg-white px-4'>End</Button>
                <Button  className='bg-amber-600 text-white relative flex justify-center hover:bg-white px-4'>Follow Up 
                 <DatePicker
                 placeholder=""
                className='bg-transparent border-none absolute top-0'
                 />
                 </Button>
                 <Button onClick={showModal} className='bg-green-600 text-white hover:bg-white px-4'>Notes</Button>
                </div>
                </div>
              )}
            </Context.Consumer>
          ),
          placement,
          duration: 0
        });
      };
      
    {/* Modal coding */}
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
      setModalData([{}])
    };
    const handleCancel = () => {
      setIsModalOpen(false);
      setModalData([{}])
    };
    const modelVal = (values)=>{
      setModalData((oldData)=>(
        [...oldData ,values]
      ))
    }
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values);
        openNotification('bottomRight' ,values);
        setRunning(true);
        form.resetFields();
        setOpen(false)
        };
        
    return (
      <Admin>
         <div className='max-w-[300px] py-2 px-2 rounded-lg border cursor-pointer shadow-lg bg-gradient-to-bl to-blue-500 from-blue-300' onClick={showDrawer}>
          <h1 className='text-white text-xl font-thin'> New Customers</h1>
         <div className='flex justify-between items-center'> <i className='bx bx-user-voice text-6xl text-white' ></i> <h1 className='text-3xl text-white'> 0 </h1></div>
         </div>
         
      <Drawer title="Add customers" placement="right" onClose={onClose} open={open}>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      form={form}
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Custumer name" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email',
          },
        ]}
      >
        <Input
          prefix={<i className='bx bx-envelope' ></i>}
          type="email"
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="mobile"
        rules={[
          {
            required: true,
            message: 'Please input your monile no',
          },
        ]}
      >
        <Input
          prefix={<i className='bx bx-mobile' ></i>}
          type="number"
          placeholder="Contact no"
        />
      </Form.Item>

      <Form.Item
        name="query"
        rules={[
          {
            required: true,
            message: 'Please input Customer Query',
          },
        ]}
      >
    
    <Input.TextArea placeholder="Query"
    />
      </Form.Item>

      <Form.Item>
        <Button  htmlType="submit" className="login-form-button hover:bg-white px-9 text-white bg-blue-600" >
          Start
        </Button>
      </Form.Item>
    </Form>
      </Drawer>
 <Context.Provider value={contextValue}>
      {contextHolder}

    </Context.Provider>
      <Modal title=" Important Notes" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        
                {
                  modelData.map((item ,index)=>(
                  <h1 className='text-lg' key={index}> {item.notes} </h1>
                ))
                }
        
        <Form  onFinish={modelVal}>
        <Form.Item name='notes'>
          <Input.TextArea />
        </Form.Item>

        <Button type="primary" htmlType="submit"  className='flex items-center bg-blue-600 p-2 rounded-md text-white mt-5'>
        <i className='bx bx-plus text-sm'></i>
        Add
        </Button>
        </Form>

      
      </Modal>
</Admin>

  )
}

export default Customer
