import React from "react";

import { BigBadge } from "../../../styles";
import { CharacterImage, SubjectType } from "../../../api/models";
import { Character } from "./Character";

type Props = {
  object: SubjectType;
  characters?: string;
  charImages?: CharacterImage[];
};

export const CharBadge = ({ object, characters, charImages }: Props) => {
  return (
    <BigBadge type={object}>
      <Character
        object="radical"
        characters={characters}
        charImages={charImages}
      />
    </BigBadge>
  );
};
