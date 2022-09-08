import styled from "styled-components";
import { colors, screens } from "variables";

import { ReactNode } from "react";

type Props = {
  text?: string;
  children?: ReactNode;
};

export const PlainText = ({ text, children }: Props) => {
  if (text) {
    return <Component dangerouslySetInnerHTML={{ __html: text }} />;
  } else {
    return <Component>{children}</Component>;
  }
};

const Component = styled.div`
  h2 {
    margin: 3rem 0 2rem 0;
    font-size: 1.75rem;
    font-weight: 700;
    border-bottom: 1px solid ${colors.theme};
  }

  @media only screen and (max-width: ${screens.s}px) {
    h2 {
      margin: 2rem 0 1.5rem 0;
      font-size: 1.5rem;
    }
  }

  h3 {
    margin: 3rem 0 2rem 0;
    padding-left: 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    border-left: 7px solid ${colors.theme};
  }

  @media only screen and (max-width: ${screens.s}px) {
    h3 {
      margin: 2rem 0 1.5rem 0;
      font-size: 1.25rem;
    }
  }

  h4 {
    margin: 3rem 0 2rem 0;
    font-size: 1.25rem;
    font-weight: 700;
  }

  @media only screen and (max-width: ${screens.s}px) {
    h4 {
      margin: 2rem 0 1.5rem 0;
      font-size: 1.1rem;
    }
  }

  p {
    margin: 1rem 0;
    line-height: 1.75;
  }

  ul,
  ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
    line-height: 1.75;
  }

  img {
    display: block;
    margin: 1rem 0;
    max-width: 100%;
  }

  iframe {
    display: block;
    margin: 1remm 0;
    max-width: 100%;
    width: 600px;
    height: 400px;
  }
`;
