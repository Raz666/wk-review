import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "@emotion/native";

import {
  Meaning,
  Reading,
  SubjectResource,
  SubjectType,
} from "../../api/models";
import { numberToPx } from "../../styles/helpers";
import { Character } from "../Subject/common";

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
        <Box key={s.id} type={type} onPress={() => goToSubject(s.id)}>
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
        </Box>
      ))}
    </>
  );
};

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled.View`
  flex-direction: column;
  justify-content: space-between;
`;

const Box = styled.Pressable<{ type: SubjectType }>`
  width: 100%;
  margin-bottom: 4px;
  padding: 6px 8px;
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
