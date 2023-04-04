import React, { PropsWithChildren } from "react";
import styled from "@emotion/native";

import { DefaultText } from "../../../styles";

export const Hints = ({ children }: PropsWithChildren) => {
  return (
    <Well>
      <Title>Hints</Title>
      {children}
    </Well>
  );
};

const Title = styled(DefaultText)`
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.hintText};
`;

const Well = styled.View`
  margin-top: 16px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.hintBg};
`;
