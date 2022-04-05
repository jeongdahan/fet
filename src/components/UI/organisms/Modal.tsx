import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Button } from "src/components/UI/atoms";

interface IModalProps {
  children?: React.ReactNode;
  visible: boolean;
  loading?: boolean;
  title: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const Modal = ({
  children,
  visible,
  loading,
  title,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: IModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { target, currentTarget } = e;

    if (target === currentTarget) onCancel();
  };

  useEffect(() => {
    setIsBrowser(true);

    const handleClose = (e: KeyboardEvent) => {
      if (e.keyCode === 27) onCancel();
    };

    window.addEventListener("keydown", handleClose);

    return () => window.removeEventListener("keydown", handleClose);
  }, []);

  const modal = visible && (
    <ModalOverlayStyle onClick={(e) => handleClose(e)}>
      <ModalStyle>
        <ModalTitleStyle>{title}</ModalTitleStyle>

        <ModalBodyStyle>{children}</ModalBodyStyle>

        <ModalFooterStyle>
          <Button type="button" loading={loading} onClick={onCancel}>
            {cancelText}
          </Button>
          {onConfirm && (
            <Button type="button" loading={loading} onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </ModalFooterStyle>
      </ModalStyle>
    </ModalOverlayStyle>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(modal, document.getElementById("modal"));
  } else {
    return null;
  }
};

const ModalOverlayStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: 100vh;
  padding: 2rem 0;

  background-color: rgba(0, 0, 0, 0.7);

  overflow-y: auto;
  z-index: 9999;
`;

const ModalStyle = styled.div`
    display: flex;
    flex-direction: column;

    max-width: 90%;
    min-width:50%;
    min-height:50%;
    padding: 2.8125rem 2.8125rem 1.875rem;

    background-color ${(props) => props.theme.color.white_600};
    border-radius: 0.9375rem;
`;

const ModalTitleStyle = styled.div`
  ${(props) => props.theme.typography.h3};
  color: ${(props) => props.theme.color.black_600};
  ${(props) => props.theme.ellipsis(1)};
`;

const ModalBodyStyle = styled.div`
  flex-grow: 1;

  margin-top: 0.875rem;
`;

const ModalFooterStyle = styled.div`
  display: flex;
  justify-content: end;

  margin-top: 0.875rem;

  > div:not(:first-child) {
    margin-left: 0.5rem;
  }
`;

export default React.memo(Modal);
