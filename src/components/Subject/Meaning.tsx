import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "@emotion/native";

import { H4, P, DefaultText } from "../../styles";
import { SubjectResource } from "../../api/models";
import { useGetStudyMaterialsQuery } from "../../api/subjectApi";
import { Hints, MnemonicText } from "./common";

type Props = {
  subject: SubjectResource;
};

export const Meaning = ({ subject }: Props) => {
  const { meanings, meaning_mnemonic, meaning_hint, parts_of_speech } =
    subject.data;
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
      <Col>
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
            <SubRow>
              {studyMats?.meaning_synonyms.map((ms, index) => (
                <UserAttribute key={index}>
                  <UserAttributeText>{ms}</UserAttributeText>
                </UserAttribute>
              ))}
              <AddBtn>
                <AddBtnText>+ Add synonym</AddBtnText>
              </AddBtn>
            </SubRow>
          )}
        </Row>
        {parts_of_speech?.length ? (
          <Row>
            <AttributeLabel>Word type</AttributeLabel>
            <AttributeValue>{parts_of_speech.join(", ")}</AttributeValue>
          </Row>
        ) : null}
      </Col>

      <H4>Mnemonic</H4>
      <MnemonicText mnemonic={meaning_mnemonic} />

      {meaning_hint ? (
        <Hints>
          <MnemonicText mnemonic={meaning_hint} />
        </Hints>
      ) : null}

      <H4>Note</H4>
      <P>{studyMats?.meaning_note || "Click to add note (TBD)"}</P>
    </>
  );
};

const Col = styled.View`
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.View`
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 8px;
  margin-bottom: 8px;
`;

const SubRow = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
`;

const AttributeValue = styled(DefaultText)`
  font-size: ${({ theme }) => theme.fontSize.small};
  text-transform: capitalize;
`;

const AttributeLabel = styled(AttributeValue)`
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const UserAttribute = styled.View`
  padding: 0 4px;
  background-color: ${({ theme }) => theme.colors.hintBg};
  border-radius: 3px;
`;

const UserAttributeText = styled(AttributeValue)`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.buttonText};
`;

const AddBtn = styled(UserAttribute)`
  background-color: ${({ theme }) => theme.colors.buttonBg};
`;

const AddBtnText = styled(UserAttributeText)`
  text-transform: uppercase;
`;
