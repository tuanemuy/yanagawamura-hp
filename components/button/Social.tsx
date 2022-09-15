import styled from "styled-components";
import { screens } from "variables";

type Props = {
  name: string;
  icon: string;
  to: string;
  scale?: number;
};

export const Social = ({ name, icon, to, scale }: Props) => {
  return (
    <Component href={to} target="_blank" scale={scale || 1}>
      <img src={icon} alt={name} width={72} />
    </Component>
  );
};

type ComponentProps = {
  scale: number;
};

const Component = styled.a<ComponentProps>`
  display: block;

  img {
    width: ${(p) => `${72 * p.scale}px`};
    height: auto;
  }

  @media only screen and (max-width: ${screens.s}px) {
    img {
      width: ${(p) => `${60 * p.scale}px`};
    }
  }
`;
