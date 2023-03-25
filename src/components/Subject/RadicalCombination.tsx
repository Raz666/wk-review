import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import styled from "@emotion/native";

import { H2, H3, P, Divider } from "../../styles";
import { SubjectResource } from "../../api/models";
import { useGetSubjectsQuery } from "../../api/subjectApi";

type Props = {
  subject: SubjectResource;
};

export const RadicalCombination = ({ subject }: Props) => {
  const { component_subject_ids } = subject.data;
  const { data: radicals, isFetching } = useGetSubjectsQuery({
    subjectIds: component_subject_ids,
  });
  const lastRadicalIndex = component_subject_ids.length - 1;

  return (
    <>
      <H2>Radical Combination</H2>
      <Divider />

      {isFetching ? (
        <ActivityIndicator />
      ) : (
        radicals && (
          <Row>
            {radicals.data.map((r, index) => (
              <Row key={r.id}>
                <Text>{r.data.characters}</Text>
                <Text>{r.data.slug}</Text>
                {index !== lastRadicalIndex && <Text>+</Text>}
              </Row>
            ))}
          </Row>
        )
      )}
    </>
  );
};

const Row = styled.View`
  flex-direction: row;
`;
