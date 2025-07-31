import { extractFile } from "lib/cms";
import styled from "styled-components";
import { colors, fonts, screens, sizes } from "variables";
import type { Event, Tag } from "../";

type Props = {
  event: Event;
  className?: string;
};

export const Link = ({ event, className }: Props) => {
  return (
    <Component href={`/event/${event.id}`} className={className || ""}>
      <div className="thumbnail">
        <picture>
          <source
            type="image/webp"
            src={
              extractFile(event.keyVisual, "800-webp")?.url ||
              event.keyVisual.url
            }
            srcSet={`${
              extractFile(event.keyVisual, "2000-webp")?.url ||
              event.keyVisual.url
            } 2000w, ${
              extractFile(event.keyVisual, "1600-webp")?.url ||
              event.keyVisual.url
            } 1600w, ${
              extractFile(event.keyVisual, "1200-webp")?.url ||
              event.keyVisual.url
            } 1200w, ${
              extractFile(event.keyVisual, "800-webp")?.url ||
              event.keyVisual.url
            } 800w`}
            sizes={`30vw, (max-width: ${screens.s}px) 100vw`}
          />
          <source
            src={
              extractFile(event.keyVisual, "800")?.url || event.keyVisual.url
            }
            srcSet={`${
              extractFile(event.keyVisual, "2000")?.url || event.keyVisual.url
            } 2000w, ${
              extractFile(event.keyVisual, "1600")?.url || event.keyVisual.url
            } 1600w, ${
              extractFile(event.keyVisual, "1200")?.url || event.keyVisual.url
            } 1200w, ${
              extractFile(event.keyVisual, "800")?.url || event.keyVisual.url
            } 800w`}
            sizes={`30vw, (max-width: ${screens.s}px) 100vw`}
          />
          <img
            src={
              extractFile(event.keyVisual, "800")?.url || event.keyVisual.url
            }
            srcSet={`${
              extractFile(event.keyVisual, "2000")?.url || event.keyVisual.url
            } 2000w, ${
              extractFile(event.keyVisual, "1600")?.url || event.keyVisual.url
            } 1600w, ${
              extractFile(event.keyVisual, "1200")?.url || event.keyVisual.url
            } 1200w, ${
              extractFile(event.keyVisual, "800")?.url || event.keyVisual.url
            } 800w`}
            alt={event.title}
            loading="lazy"
          />
        </picture>
      </div>

      <div className="meta">
        <p>{event.category.name}</p>

        <ul>
          {event.tags.map((tag: Tag) => {
            return <li key={tag.id}>{tag.name}</li>;
          })}
        </ul>
      </div>

      <div className="info">
        <h3>{event.title}</h3>
        <p>{event.overview || event.details}</p>
      </div>
    </Component>
  );
};

const Component = styled.a`
  position: relative;
  text-decoration: none;
  color: ${colors.black};

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
    margin-top: ${sizes.gapM};
    color: ${colors.black};
    text-align: left;

    h3 {
      font-size: 1.5rem;
      font-weight: 700;
    }

    p {
      margin-top: ${sizes.gapXS};
      font-size: 1rem;
      line-height: 1.75;
      font-family: ${fonts.sansSerif};
    }
  }
`;
