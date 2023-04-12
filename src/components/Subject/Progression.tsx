import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "@emotion/native";

import { H2, H4, P } from "../../styles";
import { ReviewStatistic, SrsStage } from "../../api/models";
import {
  useGetReviewsQuery,
  useGetReviewStatsQuery,
} from "../../api/subjectApi";

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
        <H2>Your Progression</H2>
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

  const percentage_correctMeaning = Math.round(
    (meaning_correct / (meaning_correct + meaning_incorrect)) * 100
  );

  const percentage_correctReading = Math.round(
    (reading_correct / (reading_correct + reading_incorrect)) * 100
  );

  return (
    <>
      <H4>Combined Answered Correct</H4>
      <P>{percentage_correct}</P>
      <H4>Meaning Answered Correct</H4>
      <P>{percentage_correctMeaning}</P>
      <Row>
        <P>Current Streak {meaning_current_streak}</P>
        <P>Longest Streak {meaning_max_streak}</P>
      </Row>
      <H4>Reading Answered Correct</H4>
      <P>{percentage_correctReading}</P>
      <Row>
        <P>Current Streak {reading_current_streak}</P>
        <P>Longest Streak {reading_max_streak}</P>
      </Row>
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
