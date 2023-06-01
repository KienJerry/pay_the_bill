import React from 'react';


const History = () => {

    let dataBill = ""

    if (typeof localStorage !== 'undefined') {
        const savedData = localStorage?.getItem('data') || "";
        if (savedData) {
            try {
              dataBill = JSON.parse(savedData);
            } catch (error) {
                return <div>133</div>
            }
          }
      } else {
        // Xử lý trường hợp localStorage không được hỗ trợ
        return <div>133</div>
      }

  return (
    <div>
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
            <td>{value?.pay?.toLocaleString()} VNĐ</td>
            </tr>
            )
        }): <div>Không có dữ liệu</div>}
        </tbody>
    </table>
    </div>
  );
};

export default History;