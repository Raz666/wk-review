import React from "react";
import { View } from "react-native";
import styled from "@emotion/native";

import { H2, H3, P, Divider, DefaultText } from "../../styles";
import { ContextSentence } from "../../api/models";

type Props = {
  sentences: ContextSentence[];
};

export const Context = ({ sentences }: Props) => {
  return (
    <>
      <H2>Context</H2>
      <Divider />

      <H3>Context Sentences</H3>
      <Col>
        {sentences.map((s, index) => (
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
