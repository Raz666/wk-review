import React, { useState } from "react";
import { FlatList, Pressable, ScrollView, View, Text } from "react-native";
import styled from "@emotion/native";

import {
  AssignmentResource,
  SrsStage,
  Subject,
  SubjectResource,
  SubjectsCollection,
  SubjectType,
} from "../../api/models";
import {
  AssignedSubjectResource,
  ScrollToNavigation,
  ScrollToView,
  SubjectList,
} from "../common";
import { H1, H2, H3, P } from "../../styles";
import { TypeSection } from "./TypeSection";
import { numberToPx } from "../../styles/helpers";
import { Legend } from "./Legend";
import { useGetAssignmentsQuery } from "../../api/subjectApi";
import { LevelSubjectGroup } from "./models";

type Props = {
  subjects: SubjectResource[];
  assignments: AssignmentResource[];
  goToSubject: (subjectId: number) => void;
  scrollRef: ScrollView | null;
};

export const Level = ({
  subjects,
  assignments,
  goToSubject,
  scrollRef,
}: Props) => {
  const getSubjectsByTypeWithAssignments = (
    type: SubjectType,
    subjects: SubjectResource[]
  ): AssignedSubjectResource[] =>
    subjects
      .filter((s) => s.object === type)
      .map((t) => {
        const assignment = assignments.find((a) => a.data.subject_id === t.id);

        return {
          ...t,
          isNew: assignment?.data.srs_stage === SrsStage.New,
          isBurned: assignment?.data.srs_stage === SrsStage.Burned,
          isLocked: !assignment,
        };
      });

  const radicals = getSubjectsByTypeWithAssignments("radical", subjects);
  const kanji = getSubjectsByTypeWithAssignments("kanji", subjects);
  const vocabs = getSubjectsByTypeWithAssignments("vocabulary", subjects);
  const level = subjects[0].data.level;
  const dataList: LevelSubjectGroup[] = [
    {
      type: "radical",
      name: "Radicals",
      subjects: radicals,
    },
    { type: "kanji", name: "Kanji", subjects: kanji },
    { type: "vocabulary", name: "Vocabulary", subjects: vocabs },
  ];

  const [dataSourceCords, setDataSourceCords] = useState<number[]>([]);
  const navItems = dataList.map((d, index) => ({
    name: d.name,
    yAxisPlacement: dataSourceCords[index],
  }));

  return (
    <Container>
      <Col>
        <Row>
          <H1>Level {level}</H1>
          <StyledH2>Radicals, kanji & vocabulary</StyledH2>
        </Row>

        <Legend />

        <ScrollToNavigation navItems={navItems} scrollRef={scrollRef} />

        {dataList.map((item, index) => (
          <ScrollToView
            key={index}
            index={index}
            yAxisPlacements={dataSourceCords}
            setYAxisPlacement={setDataSourceCords}
          >
            <TypeSection
              type={item.type}
              header={item.name}
              subjects={item.subjects}
              goToSubject={goToSubject}
            />
          </ScrollToView>
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
