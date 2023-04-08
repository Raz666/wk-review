import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "@emotion/native";

import { H2, Divider } from "../../styles";
import { Meaning, Reading, SubjectType } from "../../api/models";
import { useGetSubjectsQuery } from "../../api/subjectApi";
import { numberToPx } from "../../styles/helpers";

type Props = {
  type: SubjectType;
  goToSubject: (subjectId: number) => void;
  subjectIds?: number[];
};

export const FoundIn = ({ subjectIds, type, goToSubject }: Props) => {
  const { data: vocabs, isFetching } = useGetSubjectsQuery({
    subjectIds: subjectIds ?? [],
  });

  const getReading = (readings?: Reading[]) =>
    readings?.find((r) => r.primary)?.reading;
  const getMeaning = (meanings: Meaning[]) =>
    meanings.find((r) => r.primary)?.meaning;

  const getTitle = (object: SubjectType) => {
    switch (object) {
      case "radical":
        return "Found In Knaji";
      case "vocabulary":
        return "Kanji Composition";
      default:
        return "Found In Vocabulary";
    }
  };

  return (
    <>
      <H2>{getTitle(type)}</H2>
      <Divider />

      {isFetching ? (
        <ActivityIndicator />
      ) : vocabs ? (
        vocabs.data.map((r, index) => (
          <Box key={r.id} type={type} onTouchEnd={() => goToSubject(r.id)}>
            <Row>
              <Characters>{r.data.characters}</Characters>
              <Column>
                <Detail>{getReading(r.data.readings)}</Detail>
                <Detail>{getMeaning(r.data.meanings)}</Detail>
              </Column>
            </Row>
          </Box>
        ))
      ) : null}
    </>
  );
};

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Column = styled.View`
  flex-direction: column;
  justify-content: space-between;
`;

const Box = styled.View<{ type: SubjectType }>`
  width: 100%;
  margin-bottom: 4px;
  padding: 6px 8px;
  background-color: ${({ type, theme }) => {
    switch (type) {
      case "kanji":
        return theme.colors.vocabBg;

      default:
        return theme.colors.kanjiBg;
    }
  }};
  border-bottom-width: 3px;
  border-color: ${({ type, theme }) => {
    switch (type) {
      case "kanji":
        return theme.colors.vocabBorder;

      default:
        return theme.colors.kanjiBorder;
    }
  }};
  border-radius: 3px;
`;

const Characters = styled.Text`
  vertical-align: middle;
  font-size: ${({ theme }) => numberToPx(theme.fontSize.badge)};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.subjectText};
`;

const Detail = styled.Text`
  text-align: right;
  font-size: ${({ theme }) => numberToPx(theme.fontSize.small)};
  color: ${({ theme }) => theme.colors.subjectText};
`;
