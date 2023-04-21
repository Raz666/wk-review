import React from "react";
import { View } from "react-native";
import styled from "@emotion/native";

import { H4, P } from "../../styles";
import { ContextSentence } from "../../api/models";

type Props = {
  sentences?: ContextSentence[];
};

export const Context = ({ sentences }: Props) => {
  return (
    <>
      <H4>Context Sentences</H4>
      <Col>
        {sentences?.map((s, index) => (
          <View key={index}>
            <P>{s.ja}</P>
            <P>{s.en}</P>
          </View>
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
