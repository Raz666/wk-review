import React from "react";
import styled from "@emotion/native";

import { SubjectResource } from "../../api/models";
import { Meaning } from "./Meaning";
import { Reading } from "./Reading";
import { Vocabs } from "./Vocabs";
import { RadicalCombination } from "./RadicalCombination";
import { Progression } from "./Progression";
import { Header } from "./Header";
import { FoundInKanji } from "./FoundInKanji";

type Props = {
  subject: SubjectResource;
};

export const SubjectPage = ({ subject }: Props) => {
  const { object } = subject;

  const isRadical = object === "radical";
  const isKanji = object === "kanji";
  const isVocab = object === "vocabulary";

  return (
    <Container>
      <Header subject={subject} />

      {isKanji ? <RadicalCombination subject={subject} /> : null}
      <Meaning subject={subject} />
      {!isRadical ? <Reading subject={subject} /> : null}
      {isKanji ? <Vocabs subject={subject} /> : null}
      {isRadical ? <FoundInKanji subject={subject} /> : null}
      <Progression subjectId={subject.id} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px 10px 10px 10px;
  background-color: "#eee";
`;
