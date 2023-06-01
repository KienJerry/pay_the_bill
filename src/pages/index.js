import React, { useState } from 'react';
import ModalAdd from '../component/modal-add';
import ModalShowData from '../component/modal-showdata';
import { useRouter } from 'next/router';
const Index = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [dataBill, setDataBill] = useState({
    type: false,
    voucher: 0,
    ship: 0,
    count_price: 0,
    count_length: 0,
    data:[],
  });

  return <div className="wrapper-UI">
    <div className="btn-add green" onClick={() => setIsModalOpen(true)}>
      Bắt đầu
    </div>
    <div className="btn-add oranger" onClick={() => router.push("/history")}>
      Lịch sử
    </div>
    <ModalAdd modal={isModalOpen} setModal={setIsModalOpen} setDataBill={setDataBill} setIsModalOpen1={setIsModalOpen1}/>
    <ModalShowData  setIsModalOpen={setIsModalOpen} setIsModalOpen1={setIsModalOpen1} isModalOpen1={isModalOpen1} dataBill={dataBill}/>
  </div>
};

export default Index;
