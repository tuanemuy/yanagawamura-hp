import styled from "styled-components";
import { format } from "date-fns";
import { colors, sizes, screens } from "variables";
import { Stacked, Columns } from "unflexible-ui-core";
import { PlainText } from "components/container";
import { MiniButton } from "components/button";

import { useRouter } from "next/router";
import { News, Tag } from "../";

type Props = {
  news: News;
};

export const Single = ({ news }: Props) => {
  const router = useRouter();

  return (
    <Component>
      <Stacked paddingPos="none">
        <div className="date">
          <p>投稿：{format(news.createdAt, "yyyy.MM.dd")}</p>
          <p>更新：{format(news.updatedAt, "yyyy.MM.dd")}</p>
        </div>

        <h1>{news.title}</h1>

        <div className="meta">
          <p>
            <a href={`/news/category/${news.category.id}`}>
              {news.category.name}
            </a>
          </p>

          <ul>
            {news.tags.map((tag: Tag) => {
              return (
                <li key={tag.id}>
                  <a href={`/news/tag/${tag.id}`}>{tag.name}</a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="body">
          <PlainText text={news.body} />
        </div>
      </Stacked>

      <Stacked paddingPos="top" paddingSize="thin">
        <Columns justify="center">
          <MiniButton
            type="button"
            name="一覧に戻る"
            onClick={() => router.back()}
            color={colors.theme}
          />
        </Columns>
      </Stacked>
    </Component>
  );
};

const Component = styled.article`
  h1 {
    margin-top: ${sizes.gapXS};
    font-size: 2rem;
    line-height: 1.5;
  }

  @media only screen and (max-width: ${screens.s}px) {
    h1 {
      font-size: 1.75rem;
    }
  }

  @media only screen and (max-width: ${screens.xs}px) {
    h1 {
      font-size: 1.5rem;
    }
  }

  .date {
    display: flex;

    p {
      color: ${colors.darkGray};

      &:not(:first-child) {
        margin-left: ${sizes.gapM};
      }
    }
  }

  @media only screen and (max-width: ${screens.xs}px) {
    .date {
      p {
        &:not(:first-child) {
          margin-left: ${sizes.gapS};
        }
      }
    }
  }

  .meta {
    display: flex;
    align-items: center;
    margin-top: ${sizes.gapM};

    p {
      flex-shrink: 0;

      a {
        display: block;
        color: ${colors.white};
        padding: ${sizes.gapXS} ${sizes.gapS};
        background-color: ${colors.theme};
        line-height: 1.5;
        border-radius: 3px;
        text-decoration: none;
      }
    }

    ul {
      margin: 0 -0.5rem;
      margin-left: 1rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      list-style: none;
    }

    li {
      flex-shrink: 0;
      padding: 0 0.5rem;
      line-height: 1.5;

      a {
        display: block;
        color: ${colors.black};

        &::before {
          content: "#";
        }
      }
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .meta {
      ul {
        margin-left: 0.75rem;
      }
    }
  }

  .body {
    margin-top: ${sizes.gapL};
  }
`;
