import styled from "@emotion/native";

import { SubjectType } from "../api/models";
import { numberToPx } from "./helpers";

type BadgeType = SubjectType | ("level" | "burned");

export const Divider = styled.View`
  margin-top: 8px;
  margin-bottom: 8px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.levelText};
`;

export const BigBadge = styled.View<{
  type: BadgeType;
}>`
  min-width: 47px;
  min-height: 44px;
  margin-right: 8px;
  background-color: ${({ type, theme }) => {
    switch (type) {
      case "level":
        return theme.colors.levelBg;
      case "kanji":
        return theme.colors.kanjiBg;
      case "radical":
        return theme.colors.radicalBg;

      default:
        return theme.colors.levelBg;
    }
  }};
  border-bottom-width: 3px;
  border-color: ${({ type, theme }) => {
    switch (type) {
      case "level":
        return theme.colors.levelBorder;
      case "kanji":
        return theme.colors.kanjiBorder;
      case "radical":
        return theme.colors.radicalBorder;

      default:
        return theme.colors.levelBorder;
    }
  }};
  border-radius: 3px;
`;

export const BigBadgeText = styled.Text<{
  type: BadgeType;
}>`
  min-width: 28px;
  min-height: 28px;
  margin: 6px 8px;
  font-size: ${({ theme }) => numberToPx(theme.fontSize.badge)};
  text-align: center;
  vertical-align: middle;

  color: ${({ type, theme }) => {
    switch (type) {
      case "level":
        return theme.colors.levelText;
      case "kanji":
      case "radical":
        return theme.colors.subjectText;
      default:
        return theme.colors.levelBg;
    }
  }};
`;
