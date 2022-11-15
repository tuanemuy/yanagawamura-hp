import styled from "styled-components";
import { sizes, fonts, colors, screens } from "variables";
import { MiniLink } from "components/button";

import { ReactNode, useEffect, useState } from "react";

type Props = {
  title: string;
  subtitle: string;
  items: ReactNode[];
  more: string;
  reverse?: boolean;
};

export const ListWithTitle = ({
  title,
  subtitle,
  items,
  more,
  reverse,
}: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= screens.s) {
      setIsMobile(true);
    }
  }, []);

  return (
    <Component reverse={reverse || false}>
      <div className="title inview inview__bt">
        <h2>{title}</h2>
      </div>

      <div className="list">
        <p
          className={`inview inview__delay3 ${
            reverse ? "inview__rl" : "inview__lr"
          }`}
        >
          {subtitle}
        </p>

        <ul>
          {items.slice(0, 3).map((node: ReactNode, index: number) => {
            return (
              <li
                key={index}
                className={
                  isMobile
                    ? `inview inview__scale0510`
                    : `inview inview__scale0010 inview__delay${index + 1}`
                }
              >
                {node}
              </li>
            );
          })}
        </ul>

        <div className="link">
          <MiniLink name="もっと見る" to={more} color={colors.theme} />
        </div>
      </div>
    </Component>
  );
};

type ComponentProps = {
  reverse: boolean;
};

const Component = styled.div<ComponentProps>`
  .title {
    position: absolute;
    top: 0;
    ${(p) => (p.reverse ? `right: 0;` : `left: 0;`)}
    display: flex;

    > h2 {
      writing-mode: vertical-rl;
      font-size: 5rem;
      font-family: ${fonts.heading};
      font-weight: 400;
      font-feature-settings: initial;
      line-height: 1.3;
      white-space: nowrap;
    }
  }

  @media only screen and (max-width: ${screens.m}px) {
    .title {
      > h2 {
        font-size: 3.5rem;
      }
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .title {
      position: relative;
      ${(p) => p.reverse && `justify-content: flex-end;`}

      > h2 {
        writing-mode: horizontal-tb;
        font-size: 3rem;
        font-feature-settings: "palt";
      }
    }
  }

  .list {
    position: relative;
    text-align: ${(p) => (p.reverse ? "right" : "left")};
    ${(p) =>
      !p.reverse && `transform: translateX(calc(5rem * 1.3 + ${sizes.gapXL}));`}
    ${(p) =>
      p.reverse && `transform: translateX(calc(-5rem * 1.3 - ${sizes.gapXL}));`}

    > p {
      font-size: 2.5rem;
      font-family: ${fonts.heading};
    }

    > ul {
      display: flex;
      gap: ${sizes.gapL};
      margin-top: ${sizes.gapL};
      list-style: none;

      ${(p) =>
        p.reverse &&
        `
        flex-direction: row-reverse;
      `}

      > li {
        width: 33.33%;
      }
    }
  }

  @media only screen and (max-width: ${screens.l}px) {
    .list {
      > ul {
        gap: ${sizes.gapM};
      }
    }
  }

  @media only screen and (max-width: ${screens.m}px) {
    .list {
      ${(p) =>
        !p.reverse &&
        `transform: translateX(calc(3.5rem * 1.3 + ${sizes.gapL}));`}
      ${(p) =>
        p.reverse &&
        `transform: translateX(calc(-3.5rem * 1.3 - ${sizes.gapL}));`}

      > p {
        font-size: 1.75rem;
      }

      > ul {
        margin-top: ${sizes.gapM};
      }
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .list {
      transform: translateX(0);

      > ul {
        flex-wrap: wrap;
        gap: ${sizes.gapL};

        > li {
          width: 100%;
        }
      }
    }
  }

  .list > .link {
    display: flex;
    margin-top: ${sizes.gapL};

    ${(p) =>
      p.reverse &&
      `
        flex-direction: row-reverse;
      `}
  }
`;
