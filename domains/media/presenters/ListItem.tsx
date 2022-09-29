import styled from "styled-components";

import { Media } from "../";
import { extractFile } from "lib/cms";

type Props = {
  media: Media;
};

export const ListItem = ({ media }: Props) => {
  return (
    <Component>
      <img
        src={extractFile(media, "800")?.url || media.url}
        srcSet={`${extractFile(media, "2000")?.url || media.url} 2000w, ${
          extractFile(media, "1600")?.url || media.url
        } 1600w, ${extractFile(media, "1200")?.url || media.url} 1200w, ${
          extractFile(media, "800")?.url || media.url
        } 800w`}
        alt={media.name}
      />
    </Component>
  );
};

const Component = styled.div`
  position: relative;
  width: 100%;

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
  }
`;
