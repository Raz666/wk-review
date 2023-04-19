import React from "react";
import { View } from "react-native";
import styled from "@emotion/native";

import { SubjectResource, SubjectType } from "../../api/models";
import { H1 } from "../../styles";
import { AssignedSubjectResource, SubjectList } from "../common";
import { numberToPx } from "../../styles/helpers";

type Props = {
  type: SubjectType;
  header: string;
  subjects: AssignedSubjectResource[];
  goToSubject: (subjectId: number) => void;
};

export const TypeSection = ({ type, header, subjects, goToSubject }: Props) => {
  const sortedSubjects = subjects.sort((a, b) => {
    const aMeaning = a.data.meanings
      .find((m) => m.primary)
      ?.meaning?.replaceAll(" ", "");
    const bMeaning = b.data.meanings
      .find((m) => m.primary)
      ?.meaning?.replaceAll(" ", "");

    return aMeaning && bMeaning ? aMeaning?.localeCompare(bMeaning) : -1;
  });
  const subjectCount = subjects.length;
  const unlockedSubjectCount = subjects.reduce(
    (acc, s) => (!s.isLocked ? acc + 1 : acc),
    0
  );
  const unlockedPercentage = (unlockedSubjectCount / subjectCount) * 100;
  const notEnoughUnlocked = unlockedPercentage < 20;

  return (
    <View>
      <Header>{header}</Header>
      <ProgressBar>
        <UnlockedBar unlockedPercentage={unlockedPercentage}>
          {!notEnoughUnlocked ? (
            <ProgressLabel>
              {unlockedSubjectCount} / {subjectCount}
            </ProgressLabel>
          ) : null}
        </UnlockedBar>
        {notEnoughUnlocked ? (
          <ProgressLabel notEnoughUnlocked={notEnoughUnlocked}>
            {unlockedSubjectCount} / {subjectCount}
          </ProgressLabel>
        ) : null}
      </ProgressBar>
      <SubjectList
        type={type}
        subjects={sortedSubjects}
        goToSubject={goToSubject}
      />
    </View>
  );
};

const Header = styled(H1)`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.hintBg};
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const ProgressBar = styled.View`
  margin-bottom: 4px;
  background-color: ${({ theme }) => theme.colors.progressBarBg};
`;

const UnlockedBar = styled.View<{ unlockedPercentage: number }>`
  width: ${({ unlockedPercentage }) => `${unlockedPercentage}%`};
  display: ${({ unlockedPercentage }) =>
    unlockedPercentage < 20 ? "none" : "flex"};
  background-color: ${({ theme }) => theme.colors.burnedBg};
`;

const LockedBar = styled.View``;

const ProgressLabel = styled.Text<{ notEnoughUnlocked?: boolean }>`
  padding: 2px 4px;
  text-align: ${({ notEnoughUnlocked }) =>
    notEnoughUnlocked ? "left" : "right"};
  font-size: ${({ theme }) => numberToPx(theme.fontSize.small)};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ notEnoughUnlocked, theme }) =>
    notEnoughUnlocked ? theme.colors.primaryText : theme.colors.subjectText};
`;
