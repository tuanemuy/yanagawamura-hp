import styled from "styled-components";
import { colors, sizes, screens } from "variables";

type Props = {
  name: string;
  iconTag: string;
  to: string;
  target?: string;
  active?: boolean;
};

export const LargeSideIconLink = ({ name, iconTag, to, target, active }: Props) => {
  return (
    <Component href={to} target={target || "_self"} active={active || false}>
      <span className="icon" dangerouslySetInnerHTML={{ __html: iconTag }} />
      <span className="name">{name}</span>
    </Component>
  );
};

type ComponentProps = {
  active: boolean;
};

const Component = styled.a<ComponentProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${sizes.gapS} ${sizes.gapM};
  text-decoration: none;
  color: ${colors.black};
  border-radius: 5px;

  ${(p) =>
    p.active &&
    `
    color: ${colors.white};
    background-color: ${colors.black};
  `}

  &:hover {
    color: ${colors.black};
    background-color: rgba(0, 0, 0, 0.075);
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 0;
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    background-color: ${colors.black};
    border-radius: 50%;

    svg {
      fill: ${colors.white};
    }

    ${p => p.active && `
      background-color: ${colors.white};

      svg {
        fill: ${colors.black};
      }
    `}
  }

  .name {
    margin-left: ${sizes.gapM};
    font-size: 1.25rem;
    font-weight: 700;
  }

  @media only screen and (max-width: ${screens.s}px) {
    padding: ${sizes.gapS};

    .icon {
      width: 45px;
      height: 45px;
    }

    .name {
      font-size: 1.1rem;
    }
  }
`;
