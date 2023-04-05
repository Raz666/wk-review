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

      <Navigation>
        <NavLabel>Go To</NavLabel>

        <NavItem>Meaning</NavItem>
        <NavItem>Readings</NavItem>
        <NavItem>Found In Vocab</NavItem>
        <NavItem>Progress</NavItem>
      </Navigation>
    </>
  );
};

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const Navigation = styled.View`
  margin-top: 16px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const NavLabel = styled.Text`
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 4px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const NavItem = styled(NavLabel)`
  background-color: ${({ theme }) => theme.colors.hintBg};
`;
