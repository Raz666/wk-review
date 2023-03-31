import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import styled from "@emotion/native";

import { H2, H3, P, Divider } from "../../styles";
import { SubjectResource } from "../../api/models";
import { useGetStudyMaterialsQuery } from "../../api/subjectApi";
import { Hints, MnemonicText } from "./common";

type Props = {
  subject: SubjectResource;
};

export const Meaning = ({ subject }: Props) => {
  const { meanings, meaning_mnemonic, meaning_hint } = subject.data;
  const {
    isError,
    isFetching,
    data: studyMatsCollection,
  } = useGetStudyMaterialsQuery({ subjectId: subject.id });
  const studyMats = studyMatsCollection?.data[0]?.data;

  const primary = meanings.find((m) => m.primary)?.meaning;
  const alternatives = meanings
    .filter((m) => !m.primary && m.accepted_answer)
    .map((alt) => alt.meaning);

  return (
    <>
      <H2>Meaning</H2>

      <Divider />
      <Row>
        <AttributeLabel>Primary</AttributeLabel>
        <AttributeValue>{primary}</AttributeValue>
      </Row>
      {alternatives?.length ? (
        <Row>
          <AttributeLabel>Alternatives</AttributeLabel>
          <AttributeValue>{alternatives.join(", ")}</AttributeValue>
        </Row>
      ) : null}
      <Row>
        <AttributeLabel>User synonyms</AttributeLabel>
        {isFetching ? (
          <ActivityIndicator />
        ) : (
          <Row>
            {studyMats?.meaning_synonyms.map((ms, index) => (
              <UserAttribute key={index}>{ms}</UserAttribute>
            ))}
            <AddBtn>+ Add synonym</AddBtn>
          </Row>
        )}
      </Row>
      <H3>Mnemonic</H3>

      <MnemonicText mnemonic={meaning_mnemonic} />

      <Hints hint={meaning_hint} />

      <H3>Note</H3>
      <P>{studyMats?.meaning_note || "Click to add note (TBD)"}</P>
    </>
  );
};

const Row = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

const AttributeValue = styled.Text`
  margin-right: 8px;
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.secondaryText};
  text-transform: uppercase;
`;

const AttributeLabel = styled(AttributeValue)`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const UserAttribute = styled(AttributeValue)`
  padding: 0 4px;
  background-color: ${({ theme }) => theme.colors.hintBg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.buttonText};
  border-radius: 4px;
`;

const AddBtn = styled(UserAttribute)`
  padding: 0px 4px;
  background-color: ${({ theme }) => theme.colors.buttonBg};
`;
