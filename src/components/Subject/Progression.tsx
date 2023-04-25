import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "@emotion/native";

import { DefaultText, H2, H4, P } from "../../styles";
import { ReviewStatistic, SrsStage } from "../../api/models";
import {
  useGetReviewsQuery,
  useGetReviewStatsQuery,
} from "../../api/subjectApi";
import { ProgressBar } from "../common";

type Props = {
  subjectId: number;
};

export const Progression = ({ subjectId }: Props) => {
  const {
    isError: isErrorStats,
    isFetching: isFetchingStats,
    data: reviewStatsCollection,
  } = useGetReviewStatsQuery({ subjectId: subjectId });
  const reviewStats = reviewStatsCollection?.data[0]?.data;
  const {
    isError: isErrorReviews,
    isFetching: isFetchingReviews,
    data: reviewsCollection,
  } = useGetReviewsQuery({ subjectId: subjectId });
  const lastReview =
    reviewsCollection?.data[reviewsCollection?.data.length - 1]?.data;

  const isFetching = isFetchingReviews || isFetchingStats;

  const getSrsStageName = (stage?: SrsStage) => {
    switch (stage) {
      case SrsStage.Apprentice_1:
        return "Apprentice 1";
      case SrsStage.Apprentice_2:
        return "Apprentice 2";
      case SrsStage.Apprentice_3:
        return "Apprentice 3";
      case SrsStage.Apprentice_4:
        return "Apprentice 4";
      case SrsStage.Guru_1:
        return "Guru 1";
      case SrsStage.Guru_2:
        return "Guru 2";
      case SrsStage.Master:
        return "Master";
      case SrsStage.Enlightened:
        return "Enlightened";
      case SrsStage.Burned:
        return "Burned";
      default:
        return "Locked";
    }
  };

  return (
    <>
      <Row>
        <H2>Progress</H2>
        <StageName>{getSrsStageName(lastReview?.ending_srs_stage)}</StageName>
      </Row>
      {isFetching ? (
        <ActivityIndicator />
      ) : reviewStats ? (
        <ProgressionDetails reviewStats={reviewStats} />
      ) : null}
    </>
  );
};

const ProgressionDetails = ({
  reviewStats,
}: {
  reviewStats: ReviewStatistic;
}) => {
  const {
    subject_type,
    meaning_correct,
    meaning_current_streak,
    meaning_incorrect,
    meaning_max_streak,
    percentage_correct,
    reading_correct,
    reading_current_streak,
    reading_incorrect,
    reading_max_streak,
  } = reviewStats;

  const notRadical = subject_type !== "radical";
  const total =
    meaning_correct + meaning_incorrect + reading_correct + reading_incorrect;

  return (
    <>
      {notRadical ? (
        <>
          <H4>Combined Answered Correct</H4>
          <ProgressBar percentage={percentage_correct} total={total} />
        </>
      ) : null}

      <Progress
        label={(notRadical ? "Meaning" : "Name") + " Answered Correct"}
        currentStreak={meaning_current_streak}
        maxStreak={meaning_max_streak}
        correctCount={meaning_correct}
        incorrectCount={meaning_incorrect}
      />

      {notRadical ? (
        <Progress
          label="Reading Answered Correct"
          currentStreak={reading_current_streak}
          maxStreak={reading_max_streak}
          correctCount={reading_correct}
          incorrectCount={reading_incorrect}
        />
      ) : null}
    </>
  );
};

type ProgressProps = {
  label: string;
  currentStreak: number;
  maxStreak: number;
  correctCount: number;
  incorrectCount: number;
};
const Progress = ({
  label,
  currentStreak,
  maxStreak,
  correctCount,
  incorrectCount,
}: ProgressProps) => {
  return (
    <>
      <H4>{label}</H4>
      <StreakRow>
        <StreakSubRow>
          <P>Current Streak</P>
          <StreakValue>
            <Strong>{currentStreak}</Strong>
          </StreakValue>
        </StreakSubRow>
        <StreakSubRow>
          <P>Longest Streak</P>
          <StreakValue>
            <Strong>{maxStreak}</Strong>
          </StreakValue>
        </StreakSubRow>
      </StreakRow>
      <ProgressBar
        count={correctCount}
        total={correctCount + incorrectCount}
        percentageInstead
      />
    </>
  );
};

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

const StageName = styled(H4)`
  font-weight: bold;
  vertical-align: bottom;
`;

const StreakRow = styled.View`
  margin-bottom: 4px;
  flex-direction: row;
  align-items: baseline;
  gap: 24px;
`;
const StreakSubRow = styled(StreakRow)`
  gap: 4px;
`;

const StreakValue = styled.View`
  padding: 2px 4px;
  background-color: ${({ theme }) => theme.colors.secondaryText};
  border-radius: 2px;
`;

const Strong = styled(DefaultText)`
  font-weight: ${({ theme }) => theme.fontWeight.heavy};
  color: ${({ theme }) => theme.colors.hintBg};
`;
