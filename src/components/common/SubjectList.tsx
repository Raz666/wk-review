import React from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import styled from "@emotion/native";

import {
  Meaning,
  Reading,
  SubjectResource,
  SubjectType,
} from "../../api/models";
import { numberToPx } from "../../styles/helpers";
import { Character } from "../Subject/common";
import { CircleBadge } from "../Level/CircleBadge";

type Props = {
  type: SubjectType;
  goToSubject: (subjectId: number) => void;
  subjects: SubjectResource[];
};

export const SubjectList = ({ subjects, type, goToSubject }: Props) => {
  const getReading = (readings?: Reading[]) =>
    readings?.find((r) => r.primary)?.reading;
  const getMeaning = (meanings: Meaning[]) =>
    meanings.find((m) => m.primary)?.meaning;

  return (
    <>
      {subjects.map((s) => (
        <Pressable key={s.id} onPress={() => goToSubject(s.id)}>
          <Box
            type={type}
            source={true ? require("../../../assets/stripes.png") : []}
            resizeMode="repeat"
            imageStyle={{ borderRadius: 3 }}
          >
            <BoxContent>
              <BadgeContainer>
                <CircleBadge type="new" size="sm" />
              </BadgeContainer>
              <Row>
                <Characters>
                  <Character
                    object="radical"
                    characters={s.data.characters}
                    charImages={s.data.character_images}
                  />
                </Characters>
                <Column>
                  {s.data.readings ? (
                    <Detail>{getReading(s.data.readings)}</Detail>
                  ) : null}
                  <Detail>{getMeaning(s.data.meanings)}</Detail>
                </Column>
              </Row>
            </BoxContent>
          </Box>
        </Pressable>
      ))}
    </>
  );
};

const BadgeContainer = styled.View`
  position: absolute;
  top: -1px;
  left: -4px;
  z-index: 1;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled.View`
  flex-direction: column;
  justify-content: space-between;
`;

const Box = styled.ImageBackground<{ type: SubjectType }>`
  width: 100%;
  margin-bottom: 4px;
  background-color: ${({ type, theme }) => {
    switch (type) {
      case "radical":
        return theme.colors.radicalBg;
      case "kanji":
        return theme.colors.kanjiBg;

      default:
        return theme.colors.vocabBg;
    }
  }};
  border-bottom-width: 3px;
  border-color: ${({ type, theme }) => {
    switch (type) {
      case "radical":
        return theme.colors.radicalBorder;
      case "kanji":
        return theme.colors.kanjiBorder;

      default:
        return theme.colors.vocabBorder;
    }
  }};
  border-radius: 3px;
`;
const BoxContent = styled.View`
  padding: 6px 10px;
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
