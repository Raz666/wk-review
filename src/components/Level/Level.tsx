import React from "react";
import { FlatList } from "react-native";
import styled from "@emotion/native";

import {
  Subject,
  SubjectResource,
  SubjectsCollection,
  SubjectType,
} from "../../api/models";
import { SubjectList } from "../common";
import { H1, H2, H3, P } from "../../styles";
import { TypeSection } from "./TypeSection";
import { numberToPx } from "../../styles/helpers";
import { Legend } from "./Legend";

type LevelSubjectGroup = {
  type: SubjectType;
  name: string;
  subjects: SubjectResource[];
};

type Props = {
  subjects: SubjectsCollection;
  goToSubject: (subjectId: number) => void;
};

export const Level = ({ subjects, goToSubject }: Props) => {
  const radicals = subjects.data.filter((d) => d.object === "radical");
  const kanji = subjects.data.filter((d) => d.object === "kanji");
  const vocabs = subjects.data.filter((d) => d.object === "vocabulary");
  const level = subjects.data[0].data.level;
  const dataList: LevelSubjectGroup[] = [
    {
      type: "radical",
      name: "Radicals",
      subjects: radicals,
    },
    { type: "kanji", name: "Kanji", subjects: kanji },
    { type: "vocabulary", name: "Vocabulary", subjects: vocabs },
  ];

  return (
    <Container>
      <Col>
        <Row>
          <H1>Level {level}</H1>
          <StyledH2>Radicals, kanji & vocabulary</StyledH2>
        </Row>

        <Legend />

        {/* <FlatList
          data={dataList}
          renderItem={({ item }) => (
            <TypeSection
              type={item.type}
              header={item.name}
              subjects={item.subjects}
              goToSubject={goToSubject}
            />
          )}
          keyExtractor={(item) => item.type}
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={1} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7} // Reduce the window size
        /> */}
        {dataList.map((item) => (
          <TypeSection
            key={item.type}
            type={item.type}
            header={item.name}
            subjects={item.subjects}
            goToSubject={goToSubject}
          />
        ))}
      </Col>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px 4px 30px 4px;
  background-color: "#eee";
`;

const Col = styled.View`
  flex-direction: column;
  gap: 24px;
`;

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledH2 = styled(H3)`
  margin: 0;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  text-transform: capitalize;
`;
