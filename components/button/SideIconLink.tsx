import styled from "styled-components";
import { colors, sizes } from "variables";

type Props = {
  name: string;
  iconTag: string;
  to: string;
  target?: string;
  active?: boolean;
};

export const SideIconLink = ({ name, iconTag, to, target, active }: Props) => {
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
  padding: ${sizes.gapXS} ${sizes.gapS};
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
    width: 29px;
    height: 29px;
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
    margin-left: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }
`;
