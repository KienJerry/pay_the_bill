import { Form, Input, Switch } from 'antd';
import React from 'react';

const validate_number=[{ 
  required: true, 
  message: "Chỉ được nhập số",
  pattern: new RegExp(/^[0-9]+$/)
}]

const FormInput = (props) => {
    const {handleOk, form , countState, setCountState} = props;

    const generateFormItems = () => {
      const formItems = [];
      for (let i = 1; i <= countState; i++) {
        formItems.push(
          <div className='child-form' key={i}>
            <Form.Item
              name={`price${i}`}
              label="Giá"
              rules={validate_number}
              className="floating-label"
            >
              <Input placeholder="Giá" />
            </Form.Item>
            <Form.Item
              name={`number_of${i}`}
              label="Số lượng"
              rules={validate_number}
              className="floating-label"
            >
              <Input placeholder="Số lượng" />
            </Form.Item>
          </div>
        );
      }
      return formItems;
    };

    const generateFormFields = () => {
      const formFields = [];
      for (let i = 1; i <= countState; i++) {
        formFields.push({
          name: [`number_of${i}`],
          value: 1,
        });
      }
      return formFields;
    };

  return (
    <Form
      form={form}
      onFinish={handleOk}
      layout="vertical"
      // fields={generateFormFields()}
      className="count-form"
    >
      <div className='form-param'>
          <div className='header-param' style={{marginBottom:"3px"}}>
            <span>Các loại sản phẩm</span>
            <div className='add-bill-header'>
              <span onClick={() => setCountState(countState + 1)}>+</span>
              <span onClick={() => {countState >= 2 && setCountState(countState - 1)}}>-</span>
            </div>
          </div>
          <div className='layout-custom'>
            {generateFormItems()}
          </div>
      </div>
      <div className='form-param'>
          <div className='header-param' style={{marginBottom:"10px"}}>
            <span>Số tiền được giảm giá (Voucher)</span>
          </div>
          <Form.Item
              name={`voucher`}
              rules={validate_number}
              className="floating-label"
            >
            <Input placeholder="Nhập số tiền voucher hoặc tổng số tiền đã được giảm" />
          </Form.Item>
            <Form.Item label="Nâng cao (Voucher)" name="type_voucher" tooltip="Nếu bạn đếu biết số tiền voucher là bao nhiêu thì vui lòng ckeck vào ô bên dưới và bạn vui lòng điền cái tổng cái số tiền đã được giảm bên trên. Còn nếu biết số tiền voucher rồi thì đừng tích, Oke ?" required >
              <Switch />
            </Form.Item>
      </div>
      <div className='form-param'>
          <div className='header-param' style={{marginBottom:"10px"}}>
            <span>Phí Ship</span>
          </div>
          <Form.Item
              name={`ship`}
              rules={validate_number}
              className="floating-label"
            >
              <Input  />
            </Form.Item>
            <Form.Item label="Nâng cao (Ship)" name="type_ship" tooltip="Nếu trường hợp phí ship được tính chung vào đơn hàng thì bạn tích vào đây (lưu ý là sẽ được giảm giá số tiền theo voucher) , còn nếu phí ship riêng thì bỏ qua cái checker này" required >
              <Switch />
            </Form.Item>
      </div>
      <div className='form-param'>
          <div className='header-param' style={{marginBottom:"10px"}}>
            <span>Lưu ý</span>
          </div>
            <Form.Item label="Quan trọng" name="type_case" tooltip="Nếu bạn muốn tính theo % giá trị sản phẩm thì tích vào , nếu không muốn tính theo % giá trị sản phẩm thì bỏ qua" required >
              <Switch />
            </Form.Item>
      </div>
    </Form>
  );
};

export default FormInput;