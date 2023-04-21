import styled from "@emotion/native";

import { numberToPx } from "./helpers";

export const DefaultText = styled.Text`
  font-size: ${({ theme }) => numberToPx(theme.fontSize.default)};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const H1 = styled(DefaultText)`
  font-size: ${({ theme }) => numberToPx(theme.fontSize.h1)};
`;

export const H2 = styled(DefaultText)`
  /* margin-top: 16px; */
  font-size: ${({ theme }) => numberToPx(theme.fontSize.h2)};
`;

export const H3 = styled(DefaultText)`
  margin: 16px 0 8px 0;
  font-size: ${({ theme }) => numberToPx(theme.fontSize.h3)};
  font-weight: ${({ theme }) => theme.fontWeight.light};
`;

export const H4 = styled(DefaultText)`
  margin: 16px 0 8px 0;
  font-size: ${({ theme }) => numberToPx(theme.fontSize.h4)};
  font-weight: ${({ theme }) => theme.fontWeight.light};
`;

export const P = styled(DefaultText)`
  line-height: ${({ theme }) =>
    numberToPx(theme.fontSize.default + theme.fontSize.default * 0.6)};
`;
