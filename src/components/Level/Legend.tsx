import React from "react";
import styled from "@emotion/native";

import { P } from "../../styles";
import { numberToPx } from "../../styles/helpers";
import { CircleBadge } from "./CircleBadge";

export const Legend = () => {
  return (
    <Well>
      <Title>Legend</Title>
      <Row>
        <Col>
          <CircleBadge type="new" />
          <P>New</P>
        </Col>
        <Col>
          <CircleBadge type="locked" />
          <P>Locked</P>
        </Col>
        <Col>
          <CircleBadge type="active" />
          <P>Active</P>
        </Col>
        <Col>
          <CircleBadge type="burned" />
          <P>Burned</P>
        </Col>
      </Row>
    </Well>
  );
};

const Well = styled.View`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.hintBg};
`;

const Title = styled.Text`
  margin-bottom: 8px;
  font-size: ${({ theme }) => numberToPx(theme.fontSize.small)};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.hintText};
  text-transform: uppercase;
`;
const Col = styled.View`
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
  gap: 8px;
`;
