import React from "react";
import styled from "@emotion/native";

import { DefaultText, H4 } from "../../styles";
import { PronunciationAudio, Reading as ReadingModel } from "../../api/models";

type Props = {
  readings?: ReadingModel[];
  audios?: PronunciationAudio[];
};

export const VocabReadings = ({ readings, audios }: Props) => {
  const reading = readings?.find((r) => r.primary)?.reading;
  const mpegAudios = audios?.filter((a) => a.content_type === "audio/mpeg");

  return (
    <>
      <H4>{reading}</H4>
      <Col>
        {mpegAudios?.map((a, index) => (
          <Audio key={index}>
            <AudioName>{a.metadata.voice_actor_name}</AudioName> (
            {a.metadata.voice_description}, {a.metadata.gender})
          </Audio>
        ))}
      </Col>
    </>
  );
};

const Col = styled.View`
  margin-top: 4px;
  flex-direction: column;
  gap: 12px;
`;

const Audio = styled(DefaultText)`
  text-transform: uppercase;
`;

const AudioName = styled(Audio)`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
