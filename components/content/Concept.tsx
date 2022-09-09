import styled from "styled-components";
import { colors, sizes, fonts, screens } from "variables";

type Props = {};

export const Concept = ({}: Props) => {
  return (
    <Component>
      <div className="header inview inview__bt inview__delay1">
        <h2>
          会いたいから、
          <br />
          飲みに行く
        </h2>
      </div>

      <div className="body">
        <div className="overview">
          <div className="map inview inview__scale0910 inview__delay5">
            <img src="images/map_village.png" alt="地図" loading="lazy" />
          </div>

          <div className="text inview inview__lr inview__delay3">
            <p>
              かつて夜の街として栄えた柳川町・高崎中央銀座通り周辺の飲み屋街。未だに昭和の香りが漂います。
              <br />
              私たちはこのエリアを「ヤナガワ村」と呼び、より愛される街にしたいと考えました。
              <br />
              昔ながらの味わいのある風景と、関係の生まれる明るい街をお楽しみください。
            </p>
          </div>
        </div>

        <div className="gallery">
          <ul>
            <li className="inview inview__scale0010 inview__delay1">
              <img
                src="images/concept_01.jpg"
                alt="ヤナガワ村の雰囲気"
                loading="lazy"
              />
            </li>
            <li className="inview inview__scale0010 inview__delay2">
              <img
                src="images/concept_02.jpg"
                alt="ヤナガワ村の雰囲気"
                loading="lazy"
              />
            </li>
            <li className="inview inview__scale0010 inview__delay3">
              <img
                src="images/concept_03.jpg"
                alt="ヤナガワ村の雰囲気"
                loading="lazy"
              />
            </li>
          </ul>
        </div>
      </div>
    </Component>
  );
};

const Component = styled.div`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  gap: ${sizes.gapXL};

  @media only screen and (max-width: ${screens.l}px) {
    gap: ${sizes.gapL};
  }

  @media only screen and (max-width: ${screens.m}px) {
    display: block;
  }

  .header {
    position: relative;
    z-index: 2;
    display: flex;
    flex-shrink: 0;
    flex-grow: 0;

    h2 {
      writing-mode: vertical-rl;
      font-size: 6.4rem;
      font-family: ${fonts.heading};
      line-height: 1.3;
      white-space: nowrap;
    }
  }

  @media only screen and (max-width: ${screens.l}px) {
    .header {
      h2 {
        font-size: 5.6rem;
      }
    }
  }

  @media only screen and (max-width: ${screens.m}px) {
    .header {
      display: flex;
      justify-content: flex-end;

      h2 {
        writing-mode: horizontal-tb;
        font-size: 4rem;
        font-size: 4.5rem;
        transform: translateX(0.5em);
        text-shadow: 1px 1px 0px ${colors.background},
          5px 0px 0 ${colors.background}, 5px -5px 0 ${colors.background},
          -5px 5px ${colors.background}, -5px 0px ${colors.background},
          -5px -5px ${colors.background};
      }
    }
  }

  @media only screen and (max-width: ${screens.xs}px) {
    .header {
      justify-content: flex-start;

      h2 {
        font-size: 3.5rem;
        transform: translateX(0);
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
      margin-top: ${sizes.gapL};
    }
  }

  @media only screen and (max-width: ${screens.xs}px) {
    .body {
      margin-top: ${sizes.gapM};
    }
  }

  .overview {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: flex-end;

    .map {
      position: relative;
      z-index: 1;
      width: 100%;
      flex-shrink: 2;
      flex-grow: 2;

      img {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 1080px;
        height: auto;
        margin: auto;
        transform: translateX(-38%) translateY(1%);
      }
    }

    .text {
      position: relative;
      z-index: 2;
      flex-shrink: 1;
      flex-grow: 1;
      width: 450px;
      font-size: 1.1rem;
      line-height: 2;
    }
  }

  @media only screen and (max-width: ${screens.l}px) {
    .overview {
      .map {
        img {
          width: 950px;
          transform: translateX(-38%) translateY(0%);
        }
      }

      .text {
        width: 360px;
        font-size: 1rem;
      }
    }
  }

  @media only screen and (max-width: ${screens.m}px) {
    .overview {
      .map {
        img {
          width: 860px;
        }
      }
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .overview {
      .map {
        img {
          width: 720px;
          transform: translateX(-54%) translateY(0%);
        }
      }
    }
  }

  @media only screen and (max-width: ${screens.xs}px) {
    .overview {
      flex-direction: column-reverse;

      .map {
        img {
          width: 640px;
          transform: translateX(-27%) translateY(10%);
        }
      }

      .text {
        width: 100%;
        text-shadow: 1px 1px 0px ${colors.background},
          1px 0px 0 ${colors.background}, 1px -1px 0 ${colors.background},
          -1px 1px ${colors.background}, -1px 0px ${colors.background},
          -1px -1px ${colors.background}, 2px 2px 0px ${colors.background},
          2px 0px 0 ${colors.background}, 2px -2px 0 ${colors.background},
          -2px 2px ${colors.background}, -2px 0px ${colors.background},
          -2px -2px ${colors.background}, 3px 3px 0px ${colors.background},
          3px 0px 0 ${colors.background}, 3px -3px 0 ${colors.background},
          -3px 3px ${colors.background}, -3px 0px ${colors.background},
          -3px -3px ${colors.background}, 4px 4px 0px ${colors.background},
          4px 0px 0 ${colors.background}, 4px -4px 0 ${colors.background},
          -4px 4px ${colors.background}, -4px 0px ${colors.background},
          -4px -4px ${colors.background};
      }
    }
  }

  .gallery {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 360px;
    margin-top: 15rem;

    ul {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
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
      margin-top: 10rem;
      height: 290px;

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
      margin-top: 8rem;
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
      margin-top: 20rem;

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
