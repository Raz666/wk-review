import React from "react";
import styled from "@emotion/native";

import { SubjectResource } from "../../api/models";
import { Meaning } from "./Meaning";
import { Reading } from "./Reading";
import { FoundIn } from "./FoundIn";
import { RadicalCombination } from "./RadicalCombination";
import { Progression } from "./Progression";
import { Header } from "./Header";
import { Context } from "./Context";

type Props = {
  subject: SubjectResource;
};

export const SubjectPage = ({ subject }: Props) => {
  const { object } = subject;
  const { amalgamation_subject_ids, component_subject_ids, context_sentences } =
    subject.data;

  const isRadical = object === "radical";
  const isKanji = object === "kanji";
  const isVocab = object === "vocabulary";

  return (
    <Container>
      <Header subject={subject} />
      {isKanji ? <RadicalCombination subject={subject} /> : null}
      <Meaning subject={subject} />
      {!isRadical ? <Reading subject={subject} /> : null}

      {context_sentences ? <Context sentences={context_sentences} /> : null}
      <FoundIn
        type={subject.object}
        subjectIds={isVocab ? component_subject_ids : amalgamation_subject_ids}
      />

      <Progression subjectId={subject.id} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px 4px 30px 4px;
  background-color: "#eee";
`;
