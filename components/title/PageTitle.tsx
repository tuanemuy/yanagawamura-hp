import { colors } from "variables";
import { Stacked, PlainText } from "unflexible-ui-core";

import { url } from "lib/util";

type Props = {
  title: string;
};

export const PageTitle = ({ title }: Props) => {
  return (
    <Stacked
      wrap
      paddingSize="narrow"
      zIndex={2}
      imageSrc={url("images/back_title.jpg")}
      imageSize="cover"
      imagePos="50% 50%"
    >
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
  );
};
