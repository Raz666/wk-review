import React from "react";
import styled from "@emotion/native";
import { StyleSheet, Text, View } from "react-native";

import { H1 } from "../../styles";
import { SubjectResource, SubjectType } from "../../api/models";

type Props = {
  subject: SubjectResource;
};

export const Header = ({ subject }: Props) => {
  const { object } = subject;
  const { level, slug, characters, meanings } = subject.data;

  const primaryMeaning = meanings.find((m) => m.primary)?.meaning;

  return (
    <>
      <Row>
        <BigBadge type="level">
          <BigBadgeText>{level}</BigBadgeText>
        </BigBadge>
        <BigBadge type={object}>
          <BigBadgeText>{slug}</BigBadgeText>
        </BigBadge>
        <H1>{primaryMeaning}</H1>
      </Row>

      <View style={styles.navigation}>
        <Text style={styles.navLabel}>Go To</Text>
        <Text style={[styles.navLabel, styles.navItem]}>Meaning</Text>
        <Text style={[styles.navLabel, styles.navItem]}>Readings</Text>
        <Text style={[styles.navLabel, styles.navItem]}>Found In Vocab</Text>
        <Text style={[styles.navLabel, styles.navItem]}>Progress</Text>
      </View>
    </>
  );
};

const Row = styled.View`
  flex-direction: row;
`;

const BigBadge = styled.View<{
  type: SubjectType | ("level" | "burned");
}>`
  border-radius: 2px;
  margin-right: 8px;
  background-color: ${({ type, theme }) => {
    switch (type) {
      case "level":
        return theme.colors.levelBg;
      case "kanji":
        return theme.colors.kanjiBg;
      default:
        return theme.colors.levelBg;
    }
  }};
`;

const BigBadgeText = styled.Text`
  flex: 1;
  font-size: 26px;
  line-height: 30px;
  text-align: center;
  vertical-align: middle;
`;

const styles = StyleSheet.create({
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
