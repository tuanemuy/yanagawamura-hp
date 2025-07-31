import type { ReactNode } from "react";
import styled from "styled-components";
import { screens } from "variables";

type Props = {
  color: string;
  avoidHeader?: boolean;
  children: ReactNode;
};

export const Main = ({ color, avoidHeader, children }: Props) => {
  return (
    <Component color={color} avoidHeader={avoidHeader || false}>
      {children}
    </Component>
  );
};

type ComponentProps = {
  color: string;
  avoidHeader: boolean;
};

const Component = styled.main<ComponentProps>`
  background-color: ${(p) => p.color};
  ${(p) =>
    p.avoidHeader &&
    `
    padding-top: 110.39px;
    padding-top: 0px;

    @media only screen and (max-width: ${screens.l}px) {
      padding-top: 102.39px;
      padding-top: 0px;
    }

    @media only screen and (max-width: ${screens.s}px) {
      padding-top: 80.59px;
      padding-top: 0px;
    }
  `}
`;
