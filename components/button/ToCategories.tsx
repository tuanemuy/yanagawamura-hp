import type { Category } from "lib/graphql";
import styled from "styled-components";
import { colors, sizes } from "variables";

type Props = {
  postType: string;
  categories: Category[];
  selected?: number;
};

export const ToCategories = ({ postType, categories, selected }: Props) => {
  return (
    <Component>
      {categories.map((c: Category) => {
        return (
          <li key={c.id}>
            <a
              href={`/${postType}/category/${c.id}`}
              className={selected === c.id ? "selected" : ""}
            >
              {c.name}
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
  gap: 1rem;
  align-items: center;
  list-style: none;

  li {
    flex-shrink: 0;
    line-height: 1.5;

    a {
      display: block;
      color: ${colors.white};
      padding: ${sizes.gapXS} ${sizes.gapS};
      background-color: ${colors.darkGray};
      line-height: 1.5;
      border-radius: 3px;
      text-decoration: none;
      transition-duration: 0.3s;

      &.selected,
      &:hover {
        background-color: ${colors.theme};
      }
    }
  }
`;
