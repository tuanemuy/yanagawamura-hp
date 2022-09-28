import styled from "styled-components";
import { sizes, colors, fonts } from "variables";

import { extractFile } from "lib/cms";
import { Event } from "../";

type Props = {
  event: Event;
  className?: string;
};

export const Link = ({ event, className }: Props) => {
  return (
    <Component href={`/event/${event.id}`} className={className || ""}>
      <div className="thumbnail">
        <img
          src={extractFile(event.keyVisual, "800")?.url || event.keyVisual.url}
          alt={event.title}
          loading="lazy"
        />
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
      border-radius: 20px;
      transition-duration: 0.3s;
      object-fit: cover;
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
