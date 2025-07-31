import { MiniButton } from "components/button";
import styled from "styled-components";
import { colors, sizes } from "variables";

type Props = {
  text: string;
  onClose: () => void;
};

export const Message = ({ text, onClose }: Props) => {
  return (
    <Component>
      <p dangerouslySetInnerHTML={{ __html: text }} />

      <div className="actions">
        <MiniButton
          name="閉じる"
          type="button"
          onClick={onClose}
          color={colors.theme}
        />
      </div>
    </Component>
  );
};

const Component = styled.div`
  padding: ${sizes.gapL} ${sizes.gapL};
  background-color: ${colors.white};
  border-radius: 20px;

  p {
    text-align: center;
    line-height: 1.75;
  }

  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${sizes.gapM};
    margin-top: ${sizes.gapM};
  }
`;
