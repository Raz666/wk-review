import React from "react";
import styled from "@emotion/native";
import { Image } from "expo-image";

import { BigBadgeText } from "../../../styles";
import { CharacterImage, SubjectType } from "../../../api/models";

type Props = {
  object: SubjectType;
  characters?: string;
  charImages?: CharacterImage[];
};

export const Character = ({ object, characters, charImages }: Props) => {
  const getCharacterImage = (charImages?: CharacterImage[]) =>
    charImages?.find(
      (img) =>
        img.content_type === "image/png" && img.metadata.style_name === "128px"
    )?.url ?? "";

  return characters ? (
    <BigBadgeText type={object}>{characters}</BigBadgeText>
  ) : (
    <RadicalImg source={getCharacterImage(charImages)} />
  );
};

const RadicalImg = styled(Image)`
  width: 28px;
  height: 28px;
  margin: 8px;
  tint-color: white;
`;
