import React from 'react';
import { Modal } from 'antd';

const ModalShowData = ({setIsModalOpen, setIsModalOpen1, isModalOpen1, dataBill}) => {

  const handleCancel = () => {
    setIsModalOpen1(false);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setIsModalOpen1(false);
    const jsonData = JSON.stringify(dataBill);
    localStorage.setItem('data', jsonData);
  }

  const btn_modal =[
    <div key="cancels" className='btn-form clouse' onClick={() => handleCancel()}>
      chỉnh sửa
    </div>,
    <div key="saves"
      className='btn-form submit'
      onClick={() => handleSave()}
    >
      Lưu
    </div>,
  ]

  return (
    <>
      <Modal width={1000} title={`Kết quả ${dataBill?.type ? "tính theo % giá tiền" : " tính theo đầu người"}`} open={isModalOpen1} footer={btn_modal} onCancel={() => setIsModalOpen1(false)} >
        <p>Tổng giá sản phẩm: <span className='bold-txt'>{dataBill?.count_price}</span></p>
        <p>Tổng số lượng đơn hàng: <span className='bold-txt'>{dataBill?.count_length}</span></p>
        <p>Voucher: <span className='bold-txt'>{dataBill?.voucher}</span></p>
        <p>Phí ship: <span className='bold-txt'>{dataBill?.ship}</span></p>
        <table>
    <tbody>
      <tr>
        <th>Giá tiền gốc</th>
        <th>Số lượng</th>
        <th>Giá ship mỗi đơn hàng</th>
        <th>Số tiền giảm giá</th>
        <th>Số tiền phải trả (đã cộng ship)</th>
      </tr>
      {dataBill?.data?.length > 0 ? 
      dataBill?.data?.map((value, index) => {
        return(
          <tr key={index}>
          <td>{value?.price.toLocaleString()} VNĐ</td>
          <td>{value?.number}</td>
          <td>{value?.ship.toLocaleString()} VNĐ</td>
          <td>{dataBill?.type ? (value?.reduction_amount / value?.number).toLocaleString() : value?.reduction_amount.toLocaleString()} VNĐ</td>
          <td>{dataBill?.type ? ((value?.price - (value?.reduction_amount / value?.number)) + value?.ship).toLocaleString() : value?.pay?.toLocaleString()} VNĐ</td>
        </tr>
        )
      }): <div>Không có dữ liệu</div>}
    </tbody>
  </table>
      </Modal>
    </>
  );
};

export default ModalShowData;