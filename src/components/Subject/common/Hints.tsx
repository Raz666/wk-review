import React from "react";
import styled from "@emotion/native";

import { DefaultText, P } from "../../../styles";

type Props = {
  hint: string;
};

export const Hints = ({ hint }: Props) => {
  return (
    <Well>
      <Title>Hints</Title>
      <P>{hint}</P>
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
