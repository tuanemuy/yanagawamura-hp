import styled from "styled-components";
import { colors, sizes, fonts, screens } from "variables";

type Props = {
  title: string;
  description: string;
  images: string[];
  reverse?: boolean;
};

export const ConceptDetails = ({
  title,
  description,
  images,
  reverse,
}: Props) => {
  return (
    <Component reverse={reverse || false}>
      <div className="header inview inview__bt inview__delay1">
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
      </div>

      <div className="body">
        <div
          className={`overview inview inview__delay3 ${
            reverse ? "inview__rl" : "inview__lr"
          }`}
        >
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>

        <div className="gallery">
          <ul>
            {images.map((image: string, index: number) => {
              return (
                <li
                  key={index}
                  className={`inview inview__scale0010 inview__delay${
                    index + 1
                  }`}
                >
                  <img src={image} alt={title} loading="lazy" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Component>
  );
};

type ComponentProps = {
  reverse: boolean;
};

const Component = styled.div<ComponentProps>`
  position: relative;
  display: flex;
  flex-direction: ${(p) => (p.reverse ? "row" : "row-reverse")};
  gap: ${sizes.gapXL};

  @media only screen and (max-width: ${screens.l}px) {
    gap: ${sizes.gapL};
  }

  @media only screen and (max-width: ${screens.m}px) {
    display: block;
  }

  .header {
    display: flex;
    flex-shrink: 0;
    flex-grow: 0;

    h2 {
      writing-mode: vertical-rl;
      font-size: 4.8rem;
      font-family: ${fonts.heading};
      line-height: 1.3;
      white-space: nowrap;
    }
  }

  @media only screen and (max-width: ${screens.l}px) {
    .header {
      h2 {
        font-size: 4.5rem;
      }
    }
  }

  @media only screen and (max-width: ${screens.m}px) {
    .header {
      display: flex;
      justify-content: ${(p) => (p.reverse ? "flex-start" : "flex-end")};

      h2 {
        writing-mode: horizontal-tb;
        font-size: 3.5rem;
        text-align: ${(p) => (p.reverse ? "left" : "right")};
        text-shadow: 1px 1px 0px ${colors.background},
          5px 0px 0 ${colors.background}, 5px -5px 0 ${colors.background},
          -5px 5px ${colors.background}, -5px 0px ${colors.background},
          -5px -5px ${colors.background};
      }
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .header {
      h2 {
        font-size: 3.25rem;
      }
    }
  }

  @media only screen and (max-width: ${screens.xs}px) {
    .header {
      h2 {
        font-size: 2.75rem;
      }
    }
  }

  .body {
    position: relative;
    flex-shrink: 1;
    flex-grow: 1;
  }

  @media only screen and (max-width: ${screens.m}px) {
    .body {
      margin-top: ${sizes.gapM};
    }
  }

  @media only screen and (max-width: ${screens.xs}px) {
    .body {
      margin-top: ${sizes.gapM};
    }
  }

  .overview {
    line-height: 2;
    font-size: 1.1rem;
  }

  .gallery {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 360px;
    margin-top: ${sizes.gapXL};

    ul {
      position: absolute;
      top: 0;
      ${(p) => (p.reverse ? "left: 0;" : "right: 0;")};
      display: flex;
      flex-direction: ${(p) => (p.reverse ? "row" : "row-reverse")};
      gap: ${sizes.gapL};
      list-style: none;
    }

    li {
      flex-shrink: 0;
    }

    img {
      width: 360px;
      height: 360px;
      border-radius: 20px;
      object-fit: cover;
    }
  }

  @media only screen and (max-width: ${screens.l}px) {
    .gallery {
      height: 290px;
      margin-top: ${sizes.gapL};

      ul {
        gap: ${sizes.gapM};
      }

      img {
        width: 290px;
        height: 290px;
      }
    }
  }

  @media only screen and (max-width: ${screens.m}px) {
    .gallery {
      height: 270px;

      img {
        width: 270px;
        height: 270px;
      }
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .gallery {
      height: 30vw;

      img {
        width: 30vw;
        height: 30vw;
      }
    }
  }

  @media only screen and (max-width: ${screens.xs}px) {
    .gallery {
      height: 34vw;

      ul {
        gap: ${sizes.gapM};
      }

      img {
        width: 34vw;
        height: 34vw;
      }
    }
  }
`;
