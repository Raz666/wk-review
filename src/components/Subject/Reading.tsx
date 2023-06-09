import React from "react";
import { ActivityIndicator } from "react-native";

import { H4, P } from "../../styles";
import { SubjectResource } from "../../api/models";
import { useGetStudyMaterialsQuery } from "../../api/subjectApi";
import { Hints, MnemonicText } from "./common";
import { KanjiReadings } from "./KanjiReadings";
import { VocabReadings } from "./VocabReading";

type Props = {
  subject: SubjectResource;
};

export const Reading = ({ subject }: Props) => {
  const { readings, reading_mnemonic, reading_hint, pronunciation_audios } =
    subject.data;
  const {
    isError,
    isFetching,
    data: studyMatsCollection,
  } = useGetStudyMaterialsQuery({ subjectId: subject.id });
  const studyMats = studyMatsCollection?.data[0]?.data;

  const isKanji = subject.object === "kanji";

  return (
    <>
      {isKanji ? (
        <KanjiReadings readings={readings} />
      ) : (
        <VocabReadings readings={readings} audios={pronunciation_audios} />
      )}

      {reading_mnemonic ? (
        <>
          <H4>{isKanji ? "Mnemonic" : "Explanation"}</H4>
          <MnemonicText mnemonic={reading_mnemonic} />
        </>
      ) : null}

      {reading_hint ? (
        <Hints>
          <MnemonicText mnemonic={reading_hint} />
        </Hints>
      ) : null}

      <H4>Note</H4>
      {isFetching ? (
        <ActivityIndicator />
      ) : (
        <P>{studyMats?.reading_note || "Click to add note (TBD)"}</P>
      )}
    </>
  );
};
