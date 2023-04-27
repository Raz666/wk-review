import React, { useState } from "react";
import styled from "@emotion/native";

import { SubjectResource } from "../../api/models";
import { Header } from "./Header";
import {
  NavigableView,
  NavItem,
  ScrollableContent,
  ScrollToNavigation,
  updateNavItem,
} from "../common";
import { useSections } from "./useSections";
import { Divider, H2 } from "../../styles";

type Props = {
  subject: SubjectResource;
};

export const Subject = ({ subject, scrollRef }: Props & ScrollableContent) => {
  const sections = useSections({ subject });

  const [navItems, setNavItems] = useState<NavItem[]>(
    sections.map((d) => ({
      name: d.name,
      yAxisPlacement: 0,
    }))
  );

  return (
    <Container>
      <Header subject={subject} />

      <ScrollToNavigation navItems={navItems} scrollRef={scrollRef} />

      {sections.map((section, index) => (
        <NavigableView
          key={index}
          index={index}
          name={section.name}
          updateNavItem={(item) => updateNavItem(setNavItems, navItems, item)}
        >
          <>
            {!section.hideHeader ? (
              <>
                <H2>{section.name}</H2>
                <Divider />
              </>
            ) : null}

            {section.component}
          </>
        </NavigableView>
      ))}
    </Container>
  );
};

const Container = styled.View`
  padding: 20px 4px 30px 4px;
  background-color: "#eee";
  gap: 24px;
`;
