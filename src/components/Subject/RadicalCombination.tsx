import React from "react";
import { ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import styled from "@emotion/native";

import { H2, Divider, BigBadgeText, BigBadge, DefaultText } from "../../styles";
import { CharacterImage, SubjectResource } from "../../api/models";
import { useGetSubjectsQuery } from "../../api/subjectApi";
import { numberToPx } from "../../styles/helpers";

type Props = {
  subject: SubjectResource;
};

export const RadicalCombination = ({ subject }: Props) => {
  const { component_subject_ids } = subject.data;
  const { data: radicals, isFetching } = useGetSubjectsQuery({
    subjectIds: component_subject_ids,
  });
  const lastRadicalIndex = component_subject_ids.length - 1;
  const getCharacterImage = (charImages?: CharacterImage[]) =>
    charImages?.find(
      (img) =>
        img.content_type === "image/png" && img.metadata.style_name === "128px"
    )?.url ?? "";

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
              <BigBadge type="radical">
                {r.data.characters ? (
                  <BigBadgeText type="radical">
                    {r.data.characters}
                  </BigBadgeText>
                ) : (
                  <RadicalImg
                    source={getCharacterImage(r.data.character_images)}
                  />
                )}
              </BigBadge>
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

const RadicalImg = styled(Image)`
  width: 28px;
  height: 28px;
  margin: 8px;
  tint-color: white;
`;
