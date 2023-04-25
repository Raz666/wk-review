import React from "react";
import styled from "@emotion/native";

import { numberToPx } from "../../styles/helpers";
import { DefaultText, P } from "../../styles";

type Props<TPercentage = number | undefined> = TPercentage extends number
  ? {
      percentage: TPercentage;
      count?: number;
      total?: number;
      percentageInstead?: boolean;
    }
  : {
      count: number;
      total: number;
      percentage?: TPercentage;
      percentageInstead?: boolean;
    };

export const ProgressBar = ({
  count = 0,
  total = 0,
  percentageInstead = false,
  percentage,
}: Props) => {
  const countPercentage = percentage ?? (count / total) * 100;
  const lowCount = (percentage ?? countPercentage) < 20;

  const getLabel = () => (
    <Label lowCount={lowCount}>
      {percentage || percentageInstead
        ? (percentage ?? countPercentage.toFixed(0)) + "%"
        : count + " / " + total}
    </Label>
  );

  return (
    <>
      <Bar>
        <Progress countPercentage={countPercentage}>
          {!lowCount ? getLabel() : null}
        </Progress>

        {lowCount ? getLabel() : null}
      </Bar>
      <Legend>
        <P>0</P>
        <P>{total}</P>
      </Legend>
    </>
  );
};

const Bar = styled.View`
  background-color: ${({ theme }) => theme.colors.progressBarBg};
`;

const Progress = styled.View<{ countPercentage: number }>`
  width: ${({ countPercentage }) => `${countPercentage}%`};
  display: ${({ countPercentage }) => (countPercentage < 20 ? "none" : "flex")};
  background-color: ${({ theme }) => theme.colors.burnedBg};
`;

const Label = styled.Text<{ lowCount?: boolean }>`
  padding: 2px 4px;
  text-align: ${({ lowCount }) => (lowCount ? "left" : "right")};
  font-size: ${({ theme }) => numberToPx(theme.fontSize.small)};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ lowCount, theme }) =>
    lowCount ? theme.colors.primaryText : theme.colors.subjectText};
`;

const Legend = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
