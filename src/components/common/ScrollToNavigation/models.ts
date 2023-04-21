import { ScrollView } from "react-native";

export type NavItem = { name: string; yAxisPlacement: number };

export type ScrollableContent = {
  scrollRef: ScrollView | null;
};
