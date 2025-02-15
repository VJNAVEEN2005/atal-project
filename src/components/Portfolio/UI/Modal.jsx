import React from 'react';
import styled from 'styled-components';


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Background = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  position: relative;
  background-color: white;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 42rem;
  margin: 0 1rem;
  max-height: 90vh;
  overflow-y: auto;
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <Background onClick={onClose} />
      <Content>
       
        {children}
      </Content>
    </Overlay>
  );
};

export default Modal;
