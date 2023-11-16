import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalError({show,setShow,cityError}) {

  const handleClose = () => setShow(false);
  return (
    <>
   

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
        <p className='m-0 fs-1'>{cityError.cod}</p>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv7SqafP5ulR84wbICSNdXPLGmW9JWfiFDQw&usqp=CAU" alt="" />
          
          <h1>{cityError.message.toUpperCase()}</h1>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalError;