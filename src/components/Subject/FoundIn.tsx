import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "@emotion/native";

import { H2, Divider } from "../../styles";
import { Meaning, Reading, SubjectResource } from "../../api/models";
import { useGetSubjectsQuery } from "../../api/subjectApi";
import { numberToPx } from "../../styles/helpers";

type Props = {
  subject: SubjectResource;
};

export const FoundIn = ({ subject }: Props) => {
  const { amalgamation_subject_ids } = subject.data;
  const { data: vocabs, isFetching } = useGetSubjectsQuery({
    subjectIds: amalgamation_subject_ids,
  });

  const isRadical = subject.object === "radical";

  const getReading = (readings: Reading[]) =>
    readings.find((r) => r.primary)?.reading;
  const getMeaning = (meanings: Meaning[]) =>
    meanings.find((r) => r.primary)?.meaning;

  return (
    <>
      <H2>Found In Vocabulary</H2>
      <Divider />

      {isFetching ? (
        <ActivityIndicator />
      ) : vocabs ? (
        vocabs.data.map((r, index) => (
          <Box key={r.id} isRadical={isRadical}>
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

const Box = styled.View<{ isRadical: boolean }>`
  width: 100%;
  margin-bottom: 4px;
  padding: 6px 8px;
  background-color: ${({ theme, isRadical }) =>
    isRadical ? theme.colors.kanjiBg : theme.colors.vocabBg};
  border-bottom-width: 3px;
  border-color: ${({ theme, isRadical }) =>
    isRadical ? theme.colors.kanjiBorder : theme.colors.vocabBorder};
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
