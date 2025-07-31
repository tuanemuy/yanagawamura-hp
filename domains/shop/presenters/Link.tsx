import { extractFile } from "lib/cms";
import styled from "styled-components";
import { colors, fonts, screens, sizes } from "variables";
import type { Shop, Tag } from "../";

type Props = {
  shop: Shop;
  className?: string;
};

export const Link = ({ shop, className }: Props) => {
  return (
    <Component href={`/shop/${shop.id}`} className={className || ""}>
      <div className="thumbnail">
        <picture>
          <source
            type="image/webp"
            src={
              extractFile(shop.keyVisual, "800-webp")?.url || shop.keyVisual.url
            }
            srcSet={`${
              extractFile(shop.keyVisual, "2000-webp")?.url ||
              shop.keyVisual.url
            } 2000w, ${
              extractFile(shop.keyVisual, "1600-webp")?.url ||
              shop.keyVisual.url
            } 1600w, ${
              extractFile(shop.keyVisual, "1200-webp")?.url ||
              shop.keyVisual.url
            } 1200w, ${
              extractFile(shop.keyVisual, "800-webp")?.url || shop.keyVisual.url
            } 800w`}
            sizes={`30vw, (max-width: ${screens.s}px) 100vw`}
          />
          <source
            src={extractFile(shop.keyVisual, "800")?.url || shop.keyVisual.url}
            srcSet={`${
              extractFile(shop.keyVisual, "2000")?.url || shop.keyVisual.url
            } 2000w, ${
              extractFile(shop.keyVisual, "1600")?.url || shop.keyVisual.url
            } 1600w, ${
              extractFile(shop.keyVisual, "1200")?.url || shop.keyVisual.url
            } 1200w, ${
              extractFile(shop.keyVisual, "800")?.url || shop.keyVisual.url
            } 800w`}
            sizes={`30vw, (max-width: ${screens.s}px) 100vw`}
          />
          <img
            src={extractFile(shop.keyVisual, "800")?.url || shop.keyVisual.url}
            srcSet={`${
              extractFile(shop.keyVisual, "2000")?.url || shop.keyVisual.url
            } 2000w, ${
              extractFile(shop.keyVisual, "1600")?.url || shop.keyVisual.url
            } 1600w, ${
              extractFile(shop.keyVisual, "1200")?.url || shop.keyVisual.url
            } 1200w, ${
              extractFile(shop.keyVisual, "800")?.url || shop.keyVisual.url
            } 800w`}
            alt={shop.title}
            loading="lazy"
          />
        </picture>
      </div>

      <div className="meta">
        <p>{shop.category.name}</p>

        <ul>
          {shop.tags.map((tag: Tag) => {
            return <li key={tag.id}>{tag.name}</li>;
          })}
        </ul>
      </div>

      <div className="info">
        <h3>{shop.title}</h3>
        <p>{shop.overview || shop.details}</p>
      </div>
    </Component>
  );
};

const Component = styled.a`
  position: relative;
  color: ${colors.black};
  text-decoration: none;

  &:hover {
    .thumbnail {
      img {
        transform: scale(1.03);
      }
    }
  }

  .thumbnail {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    isolation: isolate;

    &::before {
      position: relative;
      content: "";
      display: block;
      padding-top: 66.66%;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition-duration: 0.3s;
      object-fit: cover;
    }
  }

  .meta {
    display: flex;
    align-items: center;
    margin-top: ${sizes.gapM};

    p {
      flex-shrink: 0;
      padding: ${sizes.gapXS} ${sizes.gapS};
      color: ${colors.white};
      background-color: ${colors.theme};
      line-height: 1.5;
      border-radius: 3px;
    }

    ul {
      margin: 0 -0.25rem;
      margin-left: 1rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      list-style: none;
    }

    li {
      flex-shrink: 0;
      line-height: 1.5;
      padding: 0 0.25rem;

      &::before {
        content: "#";
      }
    }
  }

  .info {
    margin-top: ${sizes.gapS};
    color: ${colors.black};
    text-align: left;

    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1.5;
    }

    p {
      margin-top: ${sizes.gapXS};
      font-size: 1rem;
      line-height: 1.75;
      font-family: ${fonts.sansSerif};
    }
  }
`;
