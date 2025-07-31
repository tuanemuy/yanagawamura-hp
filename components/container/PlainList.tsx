import type { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  items: ReactNode[];
  border?: string;
};

export const PlainList = ({ items, border }: Props) => {
  return (
    <Component border={border}>
      {items.map((item: ReactNode) => {
        return item;
      })}
    </Component>
  );
};

type ComponentProps = {
  border?: string;
};

const Component = styled.ul<ComponentProps>`
  list-style: none;

  ${(p) =>
    p.border &&
    `
    > li {
      border-top: ${p.border};

      &:last-child {
        border-bottom: ${p.border};
      }
    }
  `}
`;
