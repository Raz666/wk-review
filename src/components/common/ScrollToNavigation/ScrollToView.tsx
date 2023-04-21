import React, { PropsWithChildren } from "react";
import { View } from "react-native";

import { NavItem } from "./models";

type Props = {
  index: number;
  name: string;
  updateNavItem: (item: NavItem) => void;
};

export const NavigableView = ({
  index,
  name,
  updateNavItem,
  children,
}: PropsWithChildren & Props) => (
  <View
    key={index}
    onLayout={(event) =>
      updateNavItem({ name, yAxisPlacement: event.nativeEvent.layout.y })
    }
  >
    {children}
  </View>
);
