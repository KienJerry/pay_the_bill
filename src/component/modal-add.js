import React, {useState} from 'react';
import { Form, Modal } from 'antd';
import FormInput from './form-input';

const ModalAdd = ({modal, setModal}) => {
  const [countState ,setCountState] = useState(1);
  const [form] = Form.useForm();

  const handleOk = (data) => {
    let total = 0;
    for (const key in data) {
        if (key.startsWith("price")) {
          // Trích xuất số thứ tự của price 
          const index = key.replace("price", "");
          // Kiểm tra xem có tồn tại number_of tương ứng không
          if (`number_of${index}` in data) {
            const price = parseFloat(data[key]);
            const number_of = parseFloat(data[`number_of${index}`]);
            // Kiểm tra price và number_of có kiểu dữ liệu hợp lệ
            if (!isNaN(price) && !isNaN(number_of)) {
              total += price * number_of;
            }
          }
        }
      }
      console.log(total);
      console.log(data);
  };

  const reSet= () => {
    form.resetFields();
    setCountState(1);
  }

  const btn_modal =[
    <div key="refresh" className='btn-form oranger' onClick={() => reSet()}>
      Làm mới
    </div>,
    <div key="cancel" className='btn-form clouse' onClick={() => setModal(false)}>
      Hủy
    </div>,
    <div key="save"
      className='btn-form submit'
      onClick={form.submit}
    >
      Lưu
    </div>,
  ]

  return (
    <>
        `<Modal 
            title="Nhập thông tin đơn hàng" 
            open={modal} onOk={form.submit} 
            onCancel={() => setModal(false)} 
            footer={btn_modal}
            width={700}
        >
                <FormInput handleOk={handleOk} form={form} setCountState={setCountState} countState={countState} />
        </Modal>`
    </>
  );
};

export default ModalAdd;