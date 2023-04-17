import React from "react";
import styled from "@emotion/native";

import { DefaultText } from "../../styles";
import { numberToPx } from "../../styles/helpers";

type CircleType = "new" | "active" | "locked" | "burned";
type SubjectType = "radical" | "kanji" | "vocabulary";
type Size = "sm" | "md";
type Props = {
  type: CircleType;
  subjectType?: SubjectType;
  size?: Size;
};

export const CircleBadge = ({
  type,
  subjectType = "radical",
  size = "md",
}: Props) => {
  const isLocked = type === "locked";
  const getLabel = (type: CircleType) => {
    switch (type) {
      case "active":
        return "現";
      case "locked":
        return "錠";
      case "burned":
        return "焦";

      default:
        return "新";
    }
  };

  return (
    <StripedCircle
      source={type === "locked" ? require("../../../assets/stripes.png") : []}
      resizeMode="repeat"
      imageStyle={{ borderRadius: 100 }}
      type={type}
      subjectType={subjectType}
      size={size}
    >
      <CircleText size={size}>{getLabel(type)}</CircleText>
    </StripedCircle>
  );
};

const StripedCircle = styled.ImageBackground<{
  type: CircleType;
  subjectType: SubjectType;
  size: Size;
}>`
  width: ${({ size }) => (size === "sm" ? "18px" : "40px")};
  height: ${({ size }) => (size === "sm" ? "18px" : "40px")};
  align-items: center;
  background-color: ${({ type, subjectType, theme }) => {
    switch (type) {
      case "new":
        return theme.colors.newBg;
      case "active":
        switch (subjectType) {
          case "kanji":
            return theme.colors.kanjiBg;
          case "vocabulary":
            return theme.colors.vocabBg;

          default:
            return theme.colors.radicalBg;
        }
      case "burned":
        return theme.colors.burnedBg;

      default:
        return theme.colors.radicalBg;
    }
  }};
  border-radius: 100px;
  border-width: ${({ size }) => (size === "sm" ? "0 1px 1px 0" : "0")};
  border-color: ${({ theme }) => theme.colors.newBorder};
`;

const CircleText = styled(DefaultText)<{ size: Size }>`
  font-size: ${({ size, theme }) =>
    numberToPx(size === "sm" ? theme.fontSize.small : theme.fontSize.h3)};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  line-height: ${({ size, theme }) => {
    const fontSize = size === "sm" ? theme.fontSize.small : theme.fontSize.h3;
    return numberToPx(fontSize + fontSize * 0.5);
  }};
  color: white;
`;
