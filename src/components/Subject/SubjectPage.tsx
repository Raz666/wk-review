import React from "react";
import styled from "@emotion/native";
import { StyleSheet } from "react-native";

import { SubjectResource } from "../../api/models";
import { Meaning } from "./Meaning";
import { Reading } from "./Reading";
import { Vocabs } from "./Vocabs";
import { RadicalCombination } from "./RadicalCombination";
import { Progression } from "./Progression";
import { Header } from "./Header";

type Props = {
  subject: SubjectResource;
};

export const SubjectPage = ({ subject }: Props) => {
  const { object } = subject;
  const { level, slug, characters, meanings } = subject.data;

  const primaryMeaning = meanings.find((m) => m.primary)?.meaning;

  return (
    <Container>
      <Header subject={subject} />

      <RadicalCombination subject={subject} />
      <Meaning subject={subject} />
      <Reading subject={subject} />
      <Vocabs subject={subject} />
      <Progression subjectId={subject.id} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px 10px 10px 10px;
  background-color: "#eee";
`;

const styles = StyleSheet.create({
  squareBadge: {
    width: 44,
    height: 44,
    borderRadius: 2,
    marginRight: 8,
  },
  badgeText: {
    flex: 1,
    fontSize: 26,
    lineHeight: 30,
    textAlign: "center",
    textAlignVertical: "center",
  },
  levelBadge: {
    backgroundColor: "#a1a1a1",
  },
  levelBadgeText: {
    color: "#d5d5d5",
  },
  kanjiBadge: {
    backgroundColor: "#f0a",
  },
  kanjiBadgeText: {
    color: "#fff",
  },

  navigation: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  navLabel: {
    marginRight: 4,
    marginBottom: 4,
    padding: 4,
    fontWeight: "300",
  },
  navItem: {
    backgroundColor: "#e1e1e1",
  },
});
