import type { ReactNode } from "react";
import styled from "styled-components";
import { colors, screens, sizes } from "variables";

type Props = {
  className?: string;
  children: ReactNode;
};

export const Panel = ({ className, children }: Props) => {
  return <Component className={className || ""}>{children}</Component>;
};

const Component = styled.div`
  width: 100%;
  position: relative;
  padding: ${sizes.gapXL};
  background-color: ${colors.white};
  border-radius: 20px;

  @media only screen and (max-width: ${screens.m}px) {
    padding: ${sizes.gapL};
  }

  @media only screen and (max-width: ${screens.xs}px) {
    padding: calc(${sizes.gapM} * 1.5);
  }
`;
