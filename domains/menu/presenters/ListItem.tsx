import { extractFile } from "lib/cms";
import styled from "styled-components";
import { screens } from "variables";

import type { Menu } from "../";

type Props = {
  menu: Menu;
};

export const ListItem = ({ menu }: Props) => {
  return (
    <Component>
      <div className="image">
        <picture>
          <source
            type="image/webp"
            src={
              extractFile(menu.keyVisual, "800-webp")?.url || menu.keyVisual.url
            }
            srcSet={`${
              extractFile(menu.keyVisual, "2000-webp")?.url ||
              menu.keyVisual.url
            } 2000w, ${
              extractFile(menu.keyVisual, "1600-webp")?.url ||
              menu.keyVisual.url
            } 1600w, ${
              extractFile(menu.keyVisual, "1200-webp")?.url ||
              menu.keyVisual.url
            } 1200w, ${
              extractFile(menu.keyVisual, "800-webp")?.url || menu.keyVisual.url
            } 800w`}
            sizes={`30vw, (max-width: ${screens.s}px) 100vw`}
          />
          <source
            src={extractFile(menu.keyVisual, "800")?.url || menu.keyVisual.url}
            srcSet={`${
              extractFile(menu.keyVisual, "2000")?.url || menu.keyVisual.url
            } 2000w, ${
              extractFile(menu.keyVisual, "1600")?.url || menu.keyVisual.url
            } 1600w, ${
              extractFile(menu.keyVisual, "1200")?.url || menu.keyVisual.url
            } 1200w, ${
              extractFile(menu.keyVisual, "800")?.url || menu.keyVisual.url
            } 800w`}
            sizes={`30vw, (max-width: ${screens.s}px) 100vw`}
          />
          <img
            src={extractFile(menu.keyVisual, "800")?.url || menu.keyVisual.url}
            srcSet={`${
              extractFile(menu.keyVisual, "2000")?.url || menu.keyVisual.url
            } 2000w, ${
              extractFile(menu.keyVisual, "1600")?.url || menu.keyVisual.url
            } 1600w, ${
              extractFile(menu.keyVisual, "1200")?.url || menu.keyVisual.url
            } 1200w, ${
              extractFile(menu.keyVisual, "800")?.url || menu.keyVisual.url
            } 800w`}
            alt={menu.title}
            loading="lazy"
          />
        </picture>
      </div>

      <h3>{menu.title}</h3>
      <p>{menu.overview}</p>
    </Component>
  );
};

const Component = styled.div`
  position: relative;
  width: 100%;

  .image {
    position: relative;
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

  h3 {
    margin-top: 1rem;
    font-size: 1.25rem;
    text-align: center;
  }

  p {
    margin-top: 0.5rem;
    line-height: 1.75;
  }
`;
