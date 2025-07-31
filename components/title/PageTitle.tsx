import { url } from "lib/util";
import styled from "styled-components";
import { PlainText, Stacked } from "unflexible-ui-core";
import { colors, screens } from "variables";

type Props = {
  title: string;
};

export const PageTitle = ({ title }: Props) => {
  return (
    <Stacked
      paddingSize="narrow"
      zIndex={2}
      imageSrc={url("images/back_title.jpg")}
      imageSize="cover"
      imagePos="50% 50%"
    >
      <Overlay />
      <Stacked paddingPos="none" wrap zIndex={2}>
        <PlainText
          h2Color={colors.white}
          h2SizeXL="2rem"
          h2SizeM="1.5rem"
          h2Align="center"
          h2LetterSpacing=".1em"
        >
          <h2>{title}</h2>
        </PlainText>
      </Stacked>
    </Stacked>
  );
};

const Overlay = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 1) 25%,
      transparent 25%,
      transparent 75%,
      rgba(0, 0, 0, 1) 75%
    ),
    linear-gradient(
      45deg,
      rgba(0, 0, 0, 1) 25%,
      transparent 25%,
      transparent 75%,
      rgba(0, 0, 0, 1) 75%
    );
  background-position: 0 0, 1.5px 1.5px;
  background-size: 3px 3px;

  @media only screen and (max-width: ${screens.s}px) {
    background-position: 0 0, .75px .75px;
    background-size: 1.5px 1.5px;
  }
`;
