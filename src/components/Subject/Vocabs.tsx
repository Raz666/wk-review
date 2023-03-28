import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import styled from "@emotion/native";

import { H2, H3, P, Divider } from "../../styles";
import { Meaning, Reading, SubjectResource } from "../../api/models";
import { useGetSubjectsQuery } from "../../api/subjectApi";
import { numberToPx } from "../../styles/helpers";

type Props = {
  subject: SubjectResource;
};

export const Vocabs = ({ subject }: Props) => {
  const { amalgamation_subject_ids } = subject.data;
  const { data: vocabs, isFetching } = useGetSubjectsQuery({
    subjectIds: amalgamation_subject_ids,
  });

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
          <Box key={r.id}>
            <Row>
              <Slug>{r.data.slug}</Slug>
              <View>
                <Detail>{getReading(r.data.readings)}</Detail>
                <Detail>{getMeaning(r.data.meanings)}</Detail>
              </View>
            </Row>
          </Box>
        ))
      ) : null}
    </>
  );
};

const Box = styled.View`
  width: 100%;
  padding: 6px 8px;
  background-color: #a0f;
  border-width: 0 0 1px 0;
  border-color: #80c;
`;

const Slug = styled.Text`
  vertical-align: middle;
  font-size: ${({ theme }) => numberToPx(theme.fontSize.badge)};
  color: #fff;
`;

const Detail = styled.Text`
  text-align: right;
  font-size: ${({ theme }) => numberToPx(theme.fontSize.small)};
  color: #fff;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
