import styled from "styled-components";
import { colors } from "variables";

import { Tag } from "lib/graphql";

type Props = {
  postType: string;
  tags: Tag[];
  selected?: number;
};

export const ToTags = ({ postType, tags, selected }: Props) => {
  return (
    <Component>
      {tags.map((t: Tag) => {
        return (
          <li key={t.id}>
            <a
              href={`/${postType}/tag/${t.id}`}
              className={selected === t.id ? "selected" : ""}
            >
              {t.name}
            </a>
          </li>
        );
      })}
    </Component>
  );
};

const Component = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
  align-items: center;
  list-style: none;

  li {
    flex-shrink: 0;
    padding: 0 0.5rem;
    line-height: 1.5;

    a {
      display: block;
      color: ${colors.black};
      transition-duration: 0.3s;

      &::before {
        content: "#";
      }

      &.selected,
      &:hover {
        color: ${colors.theme};
      }
    }
  }
`;
