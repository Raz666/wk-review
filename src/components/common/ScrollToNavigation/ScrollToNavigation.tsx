import React from "react";
import styled from "@emotion/native";
import { Pressable, ScrollView } from "react-native";

import { NavItem } from "./models";

type Props = {
  navItems: NavItem[];
  scrollRef: ScrollView | null;
};

export const ScrollToNavigation = ({ navItems, scrollRef }: Props) => {
  const scrollHandler = (scrollToKey: number) =>
    scrollRef?.scrollTo({
      y: navItems[scrollToKey].yAxisPlacement,
      animated: true,
    });

  return (
    <Navigation>
      <Label>Go To</Label>

      {navItems.map((n, index) => (
        <Pressable key={index} onPress={() => scrollHandler(index)}>
          <Item>{n.name}</Item>
        </Pressable>
      ))}
    </Navigation>
  );
};

const Navigation = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
`;

const Label = styled.Text`
  padding: 6px 8px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const Item = styled(Label)`
  background-color: ${({ theme }) => theme.colors.hintBg};
`;
