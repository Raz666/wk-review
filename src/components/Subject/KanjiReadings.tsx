import React from "react";
import styled from "@emotion/native";

import { H3, P } from "../../styles";
import { Reading as ReadingModel } from "../../api/models";

type Props = {
  readings?: ReadingModel[];
};

export const KanjiReadings = ({ readings }: Props) => {
  const onyomi = readings?.filter((r) => r.type === "onyomi");
  const kunyomi = readings?.filter((r) => r.type === "kunyomi");
  const nanori = readings?.filter((r) => r.type === "nanori");

  const readingSet: { label: string; readings?: ReadingModel[] }[] = [
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

  const getListedReadings = (readings?: ReadingModel[]) =>
    readings?.map((r) => r.reading).join(", ") || "None";

  const getIsAccepted = (readings?: ReadingModel[]) =>
    !!readings?.some((r) => r.accepted_answer);

  return (
    <Row>
      {readingSet.map((r, index) => (
        <ReadingCol key={index} accepted={getIsAccepted(r.readings)}>
          <H3>{r.label}</H3>
          <P>{getListedReadings(r.readings)}</P>
        </ReadingCol>
      ))}
    </Row>
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
