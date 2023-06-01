import React, {useState} from 'react';
import { Form, Modal } from 'antd';
import FormInput from './form-input';

const ModalAdd = ({modal, setModal, setDataBill, setIsModalOpen1}) => {
  const [countState ,setCountState] = useState(1);
  const [form] = Form.useForm();

  const handleOk = (data) => {
    let total_price = 0;

    let price_voucher = parseFloat(data?.voucher);
    let price_ship = parseFloat(data?.ship);

    var output = [];

    // Xử lý lấy tổng giá tiền sản phẩm
    for (const key in data) {
        if (key.startsWith("price")) {
          const index = key.replace("price", "");
          if (`number_of${index}` in data) {
            const price = parseFloat(data[key]);
            const number_of = parseFloat(data[`number_of${index}`]);
            if (!isNaN(price) && !isNaN(number_of)) {
                total_price += price * number_of;
            }
          }
        }
      }
    
    //   Xử lý tổng tiền khi đã trừ voucher
    let total_price_v2 = total_price - price_voucher;
    if(data?.type_voucher){
        total_price_v2 = total_price - (total_price - price_voucher);
    }

    // Xử lý phần ship
    let total_price_v3 = total_price_v2 + price_ship
    if(data?.type_ship){
        total_price_v3 = (total_price + price_ship) - price_voucher;
    }

    // Xử lý phần cuối
    if(data?.type_case){

        let totalNumberOf_voucher = 0;
        let totalNumberOf = 0;
        for (const key in data) {
            if (key.startsWith("number_of")) {
              const number_of = parseFloat(data[key]);
              // Kiểm tra number_of có kiểu dữ liệu hợp lệ
              if (!isNaN(number_of)) {
                totalNumberOf += number_of;
              }
            }
          }
        
        if(data?.type_voucher){
            totalNumberOf_voucher = total_price - (total_price - price_voucher);
        }else{
            totalNumberOf_voucher = price_voucher;
        }

        var maxIndex = findMaxIndex(data, "price");


        let totalReductionAmount = 0;
      
        // Tính tổng reduction_amount và tổng giá trị price
        for (let i = 1; i <= maxIndex; i++) {
          const priceKey = `price${i}`;
          const numberKey = `number_of${i}`;
          const price = parseInt(data[priceKey]);
          const number = parseInt(data[numberKey]);
          const reductionAmount = (price - (totalNumberOf_voucher * (price / 10000))) * number;
          totalReductionAmount += reductionAmount;
      
          output.push({
            price,
            number,
            reduction_amount: parseInt(reductionAmount),
            ship: parseInt(price_ship / totalNumberOf),
          });
        }
      
        // Chia totalNumberOf_voucher thành các phần theo tỷ lệ
        const dividedAmounts = [];
        let remainingAmount = totalNumberOf_voucher;
        for (let i = 0; i < output.length - 1; i++) {
          const reductionAmount = output[i].reduction_amount;
          const dividedAmount = Math.floor((reductionAmount / totalReductionAmount) * totalNumberOf_voucher);
          dividedAmounts.push(dividedAmount);
          remainingAmount -= dividedAmount;
        }
        dividedAmounts.push(remainingAmount);
      
        // Gán các giá trị chia tỷ lệ vào output
        for (let i = 0; i < output.length; i++) {
          output[i].reduction_amount = dividedAmounts[i];
        }

    }else{
        let totalNumberOf = 0;
        let totalNumberOf_voucher = 0;
        for (const key in data) {
            if (key.startsWith("number_of")) {
              const number_of = parseFloat(data[key]);
              // Kiểm tra number_of có kiểu dữ liệu hợp lệ
              if (!isNaN(number_of)) {
                totalNumberOf += number_of;
              }
            }
          }
        
        if(data?.type_voucher){
            totalNumberOf_voucher = total_price - (total_price - price_voucher);
        }else{
            totalNumberOf_voucher = price_voucher;
        }

        var maxIndex = findMaxIndex(data, "price");

        for (var i = 1; i <= maxIndex; i++) {
            var priceKey = "price" + i;
            var numberOfKey = "number_of" + i;
          
            if (data[priceKey] && data[numberOfKey]) {
              var price = parseInt(data[priceKey]);
              var number = parseInt(data[numberOfKey]);
              var reductionAmount = totalNumberOf_voucher / totalNumberOf;
              var ship = price_ship / totalNumberOf;
              var pay = (price - reductionAmount) + ship;
          
              output.push({
                price: parseInt(price),
                number: parseInt(number),
                reduction_amount: parseInt(reductionAmount),
                ship: parseInt(ship),
                pay: parseInt(pay),
              });
            }
          }
    }

    let totalNumberOfs = 0;
    for (const key in data) {
        if (key.startsWith("number_of")) {
          const number_of = parseFloat(data[key]);
          // Kiểm tra number_of có kiểu dữ liệu hợp lệ
          if (!isNaN(number_of)) {
            totalNumberOfs += number_of;
          }
        }
      }

    setDataBill({
        type: data?.type_case ? true : false,
        voucher: data?.type_voucher ? total_price - (total_price - price_voucher) : price_voucher,
        ship: price_ship,
        count_price: total_price,
        count_length: totalNumberOfs,
        data: output
    })
    setModal(false)
    setIsModalOpen1(true)
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
      Xong
    </div>,
  ]

  return (
    <>
        <Modal 
            title="Nhập thông tin đơn hàng" 
            open={modal} onOk={form.submit} 
            onCancel={() => setModal(false)} 
            footer={btn_modal}
            width={700}
        >
                <FormInput handleOk={handleOk} form={form} setCountState={setCountState} countState={countState} />
        </Modal>
    </>
  );
};

export default ModalAdd;

function findMaxIndex(obj, keyPrefix) {
    var maxIndex = 0;
    var regex = new RegExp("^" + keyPrefix + "(\\d+)$");
  
    for (var key in obj) {
      var match = regex.exec(key);
      if (match) {
        var index = parseInt(match[1]);
        maxIndex = Math.max(maxIndex, index);
      }
    }
  
    return maxIndex;
  }
