import { extractFile } from "lib/cms";
import styled from "styled-components";
import { screens, sizes } from "variables";

import type { Staff } from "../";

type Props = {
  staff: Staff;
};

export const ListItem = ({ staff }: Props) => {
  return (
    <Component>
      <div className="image">
        <picture>
          <source
            type="image/webp"
            src={
              extractFile(staff.keyVisual, "800-webp")?.url ||
              staff.keyVisual.url
            }
            srcSet={`${
              extractFile(staff.keyVisual, "2000-webp")?.url ||
              staff.keyVisual.url
            } 2000w, ${
              extractFile(staff.keyVisual, "1600-webp")?.url ||
              staff.keyVisual.url
            } 1600w, ${
              extractFile(staff.keyVisual, "1200-webp")?.url ||
              staff.keyVisual.url
            } 1200w, ${
              extractFile(staff.keyVisual, "800-webp")?.url ||
              staff.keyVisual.url
            } 800w`}
            sizes={`30vw, (max-width: ${screens.s}px) 50vw`}
          />
          <source
            src={
              extractFile(staff.keyVisual, "800")?.url || staff.keyVisual.url
            }
            srcSet={`${
              extractFile(staff.keyVisual, "2000")?.url || staff.keyVisual.url
            } 2000w, ${
              extractFile(staff.keyVisual, "1600")?.url || staff.keyVisual.url
            } 1600w, ${
              extractFile(staff.keyVisual, "1200")?.url || staff.keyVisual.url
            } 1200w, ${
              extractFile(staff.keyVisual, "800")?.url || staff.keyVisual.url
            } 800w`}
            sizes={`30vw, (max-width: ${screens.s}px) 50vw`}
          />
          <img
            src={
              extractFile(staff.keyVisual, "1200")?.url || staff.keyVisual.url
            }
            srcSet={`${
              extractFile(staff.keyVisual, "2000")?.url || staff.keyVisual.url
            } 2000w, ${
              extractFile(staff.keyVisual, "1600")?.url || staff.keyVisual.url
            } 1600w, ${
              extractFile(staff.keyVisual, "1200")?.url || staff.keyVisual.url
            } 1200w, ${
              extractFile(staff.keyVisual, "800")?.url || staff.keyVisual.url
            } 800w`}
            sizes={`30vw, (max-width: ${screens.s}px) 50vw`}
            alt={staff.title}
            loading="lazy"
          />
        </picture>
      </div>

      <div className="profile">
        <p className="catch-phrase">{staff.catchPhrase}</p>
        <h3>{staff.title}</h3>
        <p className="message">{staff.message}</p>
      </div>
    </Component>
  );
};

const Component = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${sizes.gapL};

  @media only screen and (max-width: ${screens.s}px) {
    display: block;
  }

  .image {
    position: relative;
    flex-shrink: 0;
    flex-grow: 0;
    width: 300px;
    overflow: hidden;

    &::before {
      position: relative;
      display: block;
      content: "";
      padding-top: 100%;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
      border-radius: 20px;
    }
  }

  @media only screen and (max-width: ${screens.m}px) {
    .image {
      width: 200px;
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .image {
      width: 100%;
    }
  }

  .profile {
    .catch-phrase {
      font-size: 1.75rem;
      font-weight: 700;
    }

    h3 {
      margin-top: 1rem;
      font-size: 1.1rem;
    }

    .message {
      margin-top: 0.5rem;
      line-height: 1.75;
    }
  }

  @media only screen and (max-width: ${screens.m}px) {
    .profile {
      .catch-phrase {
        font-size: 1.5rem;
      }

      h3 {
        margin-top: 0.5rem;
      }
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .profile {
      margin-top: 1rem;
    }
  }
`;
