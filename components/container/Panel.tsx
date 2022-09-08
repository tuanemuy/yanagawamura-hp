import styled from "styled-components";
import { colors, sizes, screens } from "variables";

import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export const Panel = ({ className, children }: Props) => {
  return <Component className={className || ""}>{children}</Component>;
};

const Component = styled.div`
  position: relative;
  padding: ${sizes.gapXL};
  background-color: ${colors.white};
  border-radius: 20px;

  @media only screen and (max-width: ${screens.m}px) {
    padding: ${sizes.gapL};
  }
`;
