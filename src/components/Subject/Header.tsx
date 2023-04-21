import React from "react";
import styled from "@emotion/native";

import { BigBadge, BigBadgeText, H1 } from "../../styles";
import { SubjectResource } from "../../api/models";
import { CharBadge } from "./common";

type Props = {
  subject: SubjectResource;
};

export const Header = ({ subject }: Props) => {
  const { object } = subject;
  const { level, slug, characters, character_images, meanings } = subject.data;

  const isRadical = object === "radical";
  const primaryMeaning = meanings.find((m) => m.primary)?.meaning;

  return (
    <>
      <Row>
        <BigBadge type="level">
          <BigBadgeText type="level">{level}</BigBadgeText>
        </BigBadge>
        <CharBadge
          object={object}
          characters={characters}
          charImages={character_images}
        />
        <H1>{primaryMeaning}</H1>
      </Row>
    </>
  );
};

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;
