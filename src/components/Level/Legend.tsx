import React from "react";
import styled from "@emotion/native";

import { SubjectsCollection } from "../../api/models";
import { SubjectList } from "../common";
import { DefaultText, H1, H2, H3, P } from "../../styles";
import { TypeSection } from "./TypeSection";
import { numberToPx } from "../../styles/helpers";

export const Legend = () => {
  return (
    <Well>
      <Title>Legend</Title>
      <Row>
        <Col>
          <Circle type="new">
            <CircleText>新</CircleText>
          </Circle>
          <P>New</P>
        </Col>
        <Col>
          <StripedCircle
            source={require("../../../assets/stripes.png")}
            type="radical"
          >
            <CircleText>錠</CircleText>
          </StripedCircle>
          <P>Locked</P>
        </Col>
        <Col>
          <Circle type="radical">
            <CircleText>現</CircleText>
          </Circle>
          <P>Active</P>
        </Col>
        <Col>
          <Circle type="burned">
            <CircleText>焦</CircleText>
          </Circle>
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

const Circle = styled.View<{
  type: "new" | "radical" | "kanji" | "vocabulary" | "burned";
}>`
  width: 40px;
  height: 40px;
  align-items: center;
  background-color: ${({ type, theme }) => {
    switch (type) {
      case "new":
        return theme.colors.newBg;
      case "kanji":
        return theme.colors.kanjiBg;
      case "vocabulary":
        return theme.colors.vocabBg;
      case "burned":
        return theme.colors.burnedBg;

      default:
        return theme.colors.radicalBg;
    }
  }};
  /* border-radius: 100px;
  border-bottom-width: 3px;

  border-color: ${({ type, theme }) => {
    switch (type) {
      case "vocabulary":
        return theme.colors.vocabBorder;
      case "kanji":
        return theme.colors.kanjiBorder;
      case "radical":
        return theme.colors.radicalBorder;

      default:
        return theme.colors.radicalBorder;
    }
  }}; */
`;

const StripedCircle = styled.ImageBackground<{
  type: "radical" | "kanji" | "vocabulary";
}>`
  width: 40px;
  height: 40px;
  align-items: center;
  background-color: ${({ type, theme }) => {
    switch (type) {
      case "kanji":
        return theme.colors.kanjiBg;
      case "vocabulary":
        return theme.colors.vocabBg;

      default:
        return theme.colors.radicalBg;
    }
  }};
  border-radius: 100px;
`;

const CircleText = styled(DefaultText)`
  font-size: ${({ theme }) => numberToPx(theme.fontSize.h3)};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  line-height: ${({ theme }) =>
    numberToPx(theme.fontSize.h3 + theme.fontSize.h3 * 0.5)};
  color: white;
`;
