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
      ) : radicals ? (
        <Row>
          {radicals.data.map((r, index) => (
            <Radical key={r.id}>
              <CharBadge
                object="radical"
                characters={r.data.characters}
                charImages={r.data.character_images}
              />
              <Slug>{r.data.slug}</Slug>
              {index !== lastRadicalIndex ? <Plus>+</Plus> : null}
            </Radical>
          ))}
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
