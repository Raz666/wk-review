import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "@emotion/native";

import { H2, Divider, DefaultText } from "../../styles";
import { SubjectResource } from "../../api/models";
import { useGetSubjectsQuery } from "../../api/subjectApi";
import { numberToPx } from "../../styles/helpers";
import { CharBadge } from "./common";

type Props = {
  subject: SubjectResource;
};

export const FoundInKanji = ({ subject }: Props) => {
  const { amalgamation_subject_ids } = subject.data;
  const { data: radicals, isFetching } = useGetSubjectsQuery({
    subjectIds: amalgamation_subject_ids,
  });

  return (
    <>
      <H2>Found in kanji</H2>
      <Divider />

      {isFetching ? (
        <ActivityIndicator />
      ) : radicals ? (
        <Row>
          {radicals.data.map((r, index) => {
            const name = r.data.meanings.find((m) => m.primary)?.meaning;
            const reading = r.data.readings.find((r) => r.primary)?.reading;

            return (
              <Radical key={r.id}>
                <CharBadge object="kanji" characters={r.data.characters} />
                <Slug>{reading}</Slug>
                <Slug>{name}</Slug>
              </Radical>
            );
          })}
        </Row>
      ) : null}
    </>
  );
};

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Radical = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const Slug = styled(DefaultText)`
  font-size: ${({ theme }) => numberToPx(theme.fontSize.h3)};
  text-transform: capitalize;
`;

const Plus = styled.Text`
  margin: 0 12px;
  font-size: ${({ theme }) => numberToPx(theme.fontSize.h3)};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.secondaryText};
`;
