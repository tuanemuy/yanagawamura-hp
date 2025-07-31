import { MiniLink } from "components/button";
import { url } from "lib/util";
import styled from "styled-components";
import { colors, screens, sizes } from "variables";

type Props = {};

export const Villager = ({}: Props) => {
  return (
    <Component className="inview inview__bt inview__delay1">
      <div className="image">
        <img
          src={url("images/villager.jpg")}
          alt="ヤナガワ村民募集中"
          loading="lazy"
        />
      </div>

      <div className="body">
        <h3>LINE公式アカウントを友だち追加するだけ。</h3>
        <h2>ヤナガワ村民募集中！</h2>
        <p>
          ヤナガワ村を楽しむための特別な情報やイベントの情報をいち早く受け取りましょう。
        </p>

        <div className="link">
          <MiniLink
            name="詳しく見る"
            to={url("villager")}
            color={colors.theme}
          />
        </div>
      </div>
    </Component>
  );
};

const Component = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  background-color: ${colors.white};
  border-radius: 20px;
  overflow: hidden;

  @media only screen and (max-width: ${screens.s}px) {
    display: block;
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 500px;
    height: 100%;

    img {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media only screen and (max-width: ${screens.l}px) {
    .image {
      width: 400px;
    }
  }

  @media only screen and (max-width: ${screens.m}px) {
    .image {
      width: 300px;
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .image {
      position: relative;
      width: 100%;
      height: 240px;
    }
  }

  @media only screen and (max-width: ${screens.xs}px) {
    .image {
      height: 200px;
    }
  }

  .body {
    position: relative;
    margin-left: 500px;
    padding: ${sizes.gapXL} ${sizes.gapXL};

    h3 {
      font-size: 1.75rem;
      font-weight: 700;
    }

    h2 {
      margin-top: ${sizes.gapXS};
      font-size: 3rem;
      font-weight: 700;
    }

    p {
      margin-top: ${sizes.gapM};
    }
  }

  @media only screen and (max-width: ${screens.l}px) {
    .body {
      margin-left: 400px;
      padding: ${sizes.gapL};

      h3 {
        font-size: 1.5rem;
      }

      h2 {
        font-size: 2.75rem;
      }
    }
  }

  @media only screen and (max-width: ${screens.m}px) {
    .body {
      margin-left: 300px;

      h3 {
        font-size: 1.1rem;
      }

      h2 {
        font-size: 2.25rem;
      }
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .body {
      margin-left: 0;

      h3 {
        font-size: 1.1rem;
      }

      h2 {
        font-size: 2.25rem;
      }
    }
  }

  @media only screen and (max-width: ${screens.xs}px) {
    .body {
      h3 {
        font-size: .9rem;
      }

      h2 {
        font-size: 1.75rem;
      }
    }
  }

  .link {
    display: flex;
    margin-top: ${sizes.gapL};
  }
`;
