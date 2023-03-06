import { RotatingLines } from "react-loader-spinner";
import React from "react";
import styled from "@emotion/styled";
import { ONSITE_IQ_PURPLE } from "../theme";

const Spinner = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
`;

export const CustomSpinner = () => (
  <Spinner>
    <RotatingLines strokeColor={ONSITE_IQ_PURPLE} />
  </Spinner>
);
