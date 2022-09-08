import styled from "styled-components";
import { colors, sizes } from "variables";

type Props = {
  title: string;
  description: string;
  className?: string;
};

export const Panel = ({ title, description, className }: Props) => {
  return (
    <Component className={className || ""}>
      <h3 dangerouslySetInnerHTML={{ __html: title }} />
      <p dangerouslySetInnerHTML={{ __html: description }} />
    </Component>
  );
};

const Component = styled.div`
  width: 100%;
  height: 100%;
  padding: ${sizes.gapL};
  background-color: ${colors.white};
  border-radius: 20px;

  h3 {
    font-size: 1.5rem;
    text-align: center;

    &::before {
      content: "『";
      margin-right: .5rem;
    }

    &::after {
      content: "』";
      margin-left: .5rem;
    }
  }

  p {
    margin-top: ${sizes.gapM};
  }
`;
