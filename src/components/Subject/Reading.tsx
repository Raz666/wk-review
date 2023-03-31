import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "@emotion/native";

import { H2, H3, P, Divider } from "../../styles";
import { Reading as ReadingModel, SubjectResource } from "../../api/models";
import { useGetStudyMaterialsQuery } from "../../api/subjectApi";
import { Hints, MnemonicText } from "./common";

type Props = {
  subject: SubjectResource;
};

export const Reading = ({ subject }: Props) => {
  const { readings, reading_mnemonic, reading_hint } = subject.data;
  const {
    isError,
    isFetching,
    data: studyMatsCollection,
  } = useGetStudyMaterialsQuery({ subjectId: subject.id });
  const studyMats = studyMatsCollection?.data[0]?.data;

  const onyomi = readings.filter((r) => r.type === "onyomi");
  const kunyomi = readings.filter((r) => r.type === "kunyomi");
  const nanori = readings.filter((r) => r.type === "nanori");

  const readingSet: { label: string; readings: ReadingModel[] }[] = [
    {
      label: "On’yomi",
      readings: onyomi,
    },
    {
      label: "Kun’yomi",
      readings: kunyomi,
    },
    {
      label: "Nanori",
      readings: nanori,
    },
  ];

  const getListedReadings = (readings: ReadingModel[]) =>
    readings.map((r) => r.reading).join(", ") || "None";

  const getIsAccepted = (readings: ReadingModel[]) =>
    readings.some((r) => r.accepted_answer);

  return (
    <>
      <H2>Readings</H2>

      <Divider />
      <Row>
        {readingSet.map((r, index) => (
          <ReadingCol key={index} accepted={getIsAccepted(r.readings)}>
            <H3>{r.label}</H3>
            <P>{getListedReadings(r.readings)}</P>
          </ReadingCol>
        ))}
      </Row>
      <H3>Mnemonic</H3>
      <MnemonicText mnemonic={reading_mnemonic} />

      <Hints hint={reading_hint} />

      <H3>Note</H3>
      {isFetching ? (
        <ActivityIndicator />
      ) : (
        <P>{studyMats?.reading_note || "Click to add note (TBD)"}</P>
      )}
    </>
  );
};

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ReadingCol = styled.View<{ accepted: boolean }>`
  flex-direction: column;
  opacity: ${({ accepted }) => (accepted ? "1" : "0.3")};
`;
