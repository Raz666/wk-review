import React, { PropsWithChildren } from "react";
import { View } from "react-native";

type Props = {
  index: number;
  yAxisPlacements: number[];
  setYAxisPlacement: (yAxisPlacements: number[]) => void;
};

export const ScrollToView = ({
  index,
  yAxisPlacements,
  setYAxisPlacement,
  children,
}: PropsWithChildren & Props) => {
  return (
    <View
      key={index}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        yAxisPlacements[index] = layout.y;
        setYAxisPlacement(yAxisPlacements);
      }}
    >
      {children}
    </View>
  );
};
