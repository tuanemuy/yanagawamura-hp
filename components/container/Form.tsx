import type { ReactNode } from "react";
import styled from "styled-components";
import { colors, screens, sizes } from "variables";

type Props = {
  children: ReactNode;
};

export const Form = ({ children }: Props) => {
  return <Component>{children}</Component>;
};

const Component = styled.div`
  .line {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    &:not(:first-child) {
      margin-top: ${sizes.gapL};
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .line {
      display: block;
    }
  }

  .label {
    display: flex;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 1h0;
    width: 300px;

    > label {
      font-weight: 700;
    }

    &.required {
      &::after {
        content: "必須";
        margin-left: .75rem;
        padding: .1rem .5rem;
        color: ${colors.white};
        background-color: ${colors.red};
        border-radius: 3px;
        font-size: .9rem;
      }
    }
  }

  .input {
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;

    input,
    textarea {
      width: 100%;
      padding: 0.75rem;
      font-size: 16px;
      background-color: ${colors.lightGray};
    }

  }

  @media only screen and (max-width: ${screens.s}px) {
    .input {
      margin-top: ${sizes.gapM};
    }
  }

  .input.checkbox {
    display: flex;
    align-items: center;

    input {
      width: 1rem;
    }

    label {
      margin-left: .5rem;
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .input.checkbox {
      margin-top: 0;
    }
  }

  .error {
    margin-top: 0.5rem;
    color: ${colors.red};
  }
`;
