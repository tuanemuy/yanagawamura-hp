import { lighten, rgba } from "polished";
import styled from "styled-components";
import { colors } from "variables";

type Props = {
  name: string;
  type: "button" | "submit";
  onClick?: () => void;
  color: string;
};

export const MiniButton = ({ name, type, onClick, color }: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Component type={type} onClick={handleClick} color={color}>
      {name}
    </Component>
  );
};

type ComponentProps = {
  color: string;
};

const Component = styled.button<ComponentProps>`
  display: block;
  padding: 0.75rem 1.5rem;
  color: ${colors.white};
  background-color: ${(p) => p.color};
  border: 5px solid ${(p) => rgba(p.color, 0.6)};
  background-clip: padding-box;
  font-size: 1.1rem;
  text-decoration: none;

  &:hover {
    background-color: ${(p) => lighten(0.02, p.color)};
  }
`;
