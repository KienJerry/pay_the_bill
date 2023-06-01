import React, { useState } from 'react';
import ModalAdd from '../component/modal-add';
const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return <div className="wrapper-UI">
    <div className="btn-add green" onClick={() => setIsModalOpen(true)}>
      Bắt đầu
    </div>
    <div className="btn-add oranger">
      Lịch sử
    </div>
    <ModalAdd modal={isModalOpen} setModal={setIsModalOpen}/>
  </div>;
};

export default Index;
