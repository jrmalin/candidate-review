import React from "react";
import { SECONDARY_GRAY } from "../theme";
import styled from "@emotion/styled";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: white;
  opacity: 75%;
`;

const ModalForeground = styled.div`
  position: fixed;
  top: calc(50% - 1rem);
  left: calc(50% - 1rem);
  transform: translate(-50%, -50%);
  background-color: ${SECONDARY_GRAY};
  border-radius: 32px;
  padding: 2rem;
  margin: 1rem;
`;

export const PopupModal = ({
  children,
  onClickClose,
}: {
  children: React.ReactNode;
  onClickClose: () => void;
}) => {
  return (
    <>
      <ModalBackground onClick={onClickClose} />
      <ModalForeground>{children}</ModalForeground>
    </>
  );
};
