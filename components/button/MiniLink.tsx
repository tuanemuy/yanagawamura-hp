import { lighten, rgba } from "polished";
import styled from "styled-components";
import { colors, screens, sizes } from "variables";

type Props = {
  name: string;
  to: string;
  color: string;
  target?: string;
};

export const MiniLink = ({ name, to, color, target }: Props) => {
  return (
    <Component href={to} color={color} target={target || "_self"}>
      {name}
    </Component>
  );
};

type ComponentProps = {
  color: string;
};

const Component = styled.a<ComponentProps>`
  display: block;
  padding: ${sizes.gapS} ${sizes.gapM};
  color: ${colors.white};
  background-color: ${(p) => p.color};
  border: 4px solid ${(p) => rgba(p.color, 0.6)};
  background-clip: padding-box;
  font-size: 1.1rem;
  text-decoration: none;

  &:hover {
    background-color: ${(p) => lighten(0.02, p.color)};
  }
`;
