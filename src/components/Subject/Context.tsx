import React from "react";
import { View } from "react-native";
import styled from "@emotion/native";

import { H2, H4, P, Divider, DefaultText } from "../../styles";
import { ContextSentence } from "../../api/models";

type Props = {
  sentences: ContextSentence[];
};

export const Context = ({ sentences }: Props) => {
  return (
    <>
      <H2>Context</H2>
      <Divider />

      <H4>Context Sentences</H4>
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
