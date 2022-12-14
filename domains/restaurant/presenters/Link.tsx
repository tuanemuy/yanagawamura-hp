import styled from "styled-components";
import { sizes, colors, fonts, screens } from "variables";

import { extractFile } from "lib/cms";
import { Restaurant, Tag } from "../";

type Props = {
  restaurant: Restaurant;
  className?: string;
};

export const Link = ({ restaurant, className }: Props) => {
  return (
    <Component
      href={`/restaurant/${restaurant.id}`}
      className={className || ""}
    >
      <div className="thumbnail">
        <picture>
          <source
            type="image/webp"
            src={
              extractFile(restaurant.keyVisual, "800-webp")?.url ||
              restaurant.keyVisual.url
            }
            srcSet={`${
              extractFile(restaurant.keyVisual, "2000-webp")?.url ||
              restaurant.keyVisual.url
            } 2000w, ${
              extractFile(restaurant.keyVisual, "1600-webp")?.url ||
              restaurant.keyVisual.url
            } 1600w, ${
              extractFile(restaurant.keyVisual, "1200-webp")?.url ||
              restaurant.keyVisual.url
            } 1200w, ${
              extractFile(restaurant.keyVisual, "800-webp")?.url ||
              restaurant.keyVisual.url
            } 800w`}
            sizes={`30vw, (max-width: ${screens.s}px) 100vw`}
          />
          <source
            src={
              extractFile(restaurant.keyVisual, "800")?.url ||
              restaurant.keyVisual.url
            }
            srcSet={`${
              extractFile(restaurant.keyVisual, "2000")?.url ||
              restaurant.keyVisual.url
            } 2000w, ${
              extractFile(restaurant.keyVisual, "1600")?.url ||
              restaurant.keyVisual.url
            } 1600w, ${
              extractFile(restaurant.keyVisual, "1200")?.url ||
              restaurant.keyVisual.url
            } 1200w, ${
              extractFile(restaurant.keyVisual, "800")?.url ||
              restaurant.keyVisual.url
            } 800w`}
            sizes={`30vw, (max-width: ${screens.s}px) 100vw`}
          />
          <img
            src={
              extractFile(restaurant.keyVisual, "800")?.url ||
              restaurant.keyVisual.url
            }
            srcSet={`${
              extractFile(restaurant.keyVisual, "2000")?.url ||
              restaurant.keyVisual.url
            } 2000w, ${
              extractFile(restaurant.keyVisual, "1600")?.url ||
              restaurant.keyVisual.url
            } 1600w, ${
              extractFile(restaurant.keyVisual, "1200")?.url ||
              restaurant.keyVisual.url
            } 1200w, ${
              extractFile(restaurant.keyVisual, "800")?.url ||
              restaurant.keyVisual.url
            } 800w`}
            alt={restaurant.title}
            loading="lazy"
          />
        </picture>
      </div>

      <div className="meta">
        <p>{restaurant.category.name}</p>

        <ul>
          {restaurant.tags.map((tag: Tag) => {
            return <li key={tag.id}>{tag.name}</li>;
          })}
        </ul>
      </div>

      <div className="info">
        <h3>{restaurant.title}</h3>
        <p>{restaurant.overview || restaurant.details}</p>
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
