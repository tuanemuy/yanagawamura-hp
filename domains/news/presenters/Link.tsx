import { format } from "date-fns";
import styled from "styled-components";
import { colors, screens, sizes } from "variables";

import type { News, Tag } from "../";

type Props = {
  news: News;
};

export const Link = ({ news }: Props) => {
  return (
    <Component href={`/news/${news.id}`}>
      <div className="title">
        <p>{format(news.createdAt, "yyyy.MM.dd")}</p>
        <h3>{news.title}</h3>
      </div>

      <div className="footer">
        <p>{news.category.name}</p>

        <ul>
          {news.tags.map((tag: Tag) => {
            return <li key={tag.id}>{tag.name}</li>;
          })}
        </ul>
      </div>
    </Component>
  );
};

const Component = styled.a`
  display: block;
  padding: ${sizes.gapL} ${sizes.gapM};
  text-decoration: none;
  color: ${colors.black};

  &:hover {
    background-color: ${colors.lightGray};
  }

  @media only screen and (max-width: ${screens.s}px) {
    padding: ${sizes.gapM} ${sizes.gapS};
  }

  .title {
    display: flex;
    align-items: center;

    p {
      flex-shrink: 0;
      flex-grow: 0;
    }

    h3 {
      margin-left: 1rem;
      font-size: 1.25rem;
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .title {
      display: block;

      h3 {
        margin-top: .25rem;
        margin-left: 0;
      }
    }
  }

  .footer {
    display: flex;
    align-items: center;
    margin-top: ${sizes.gapS};

    p {
      padding: ${sizes.gapXS} ${sizes.gapS};
      color: ${colors.white};
      background-color: ${colors.theme};
      line-height: 1.5;
      border-radius: 3px;
    }

    ul {
      margin-left: 1rem;
      display: flex;
      align-items: center;
      list-style: none;
    }

    li {
      line-height: 1.5;

      &::before {
        content: "#";
      }

      &:not(:first-child) {
        margin-left: 0.5rem;
      }
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .footer {
      margin-top: ${sizes.gapM};

      ul {
        margin-left: .75rem;
      }
    }
  }
`;
