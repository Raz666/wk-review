import React from "react";
import styled from "@emotion/native";
import { Pressable, ScrollView } from "react-native";

type NavItem = { name: string; yAxisPlacement: number };

type Props = {
  navItems: NavItem[];
  scrollRef: ScrollView | null;
};

export const ScrollToNavigation = ({ navItems, scrollRef }: Props) => {
  const scrollHandler = (scrollToKey: number) => {
    console.log(scrollToKey, navItems);
    scrollRef?.scrollTo({
      y: navItems[scrollToKey].yAxisPlacement,
      animated: true,
    });
  };

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
  margin-top: 16px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Label = styled.Text`
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 4px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const Item = styled(Label)`
  background-color: ${({ theme }) => theme.colors.hintBg};
`;
