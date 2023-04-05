import React from "react";
import styled from "@emotion/native";

import { P } from "../../../styles";

type Props = {
  mnemonic: string;
};

export const MnemonicText = ({ mnemonic }: Props) => {
  const regEx =
    /<radical>.*?<\/radical>|<kanji>.*?<\/kanji>|<vocabulary>.*?<\/vocabulary>|<reading>.*?<\/reading>|<ja>.*?<\/ja>/gim;

  const parts = mnemonic?.split(regEx);
  const matches = mnemonic?.match(regEx) || [];

  return (
    <P>
      {parts?.map((part, index) => (
        <FormattedPartWrap key={index}>
          {part}
          {matches?.length >= index &&
            (matches[index]?.includes("radical>") ? (
              <Radical>
                {matches[index]
                  .replace("<radical>", "")
                  .replace("</radical>", "")}
              </Radical>
            ) : matches[index]?.includes("kanji>") ? (
              <Kanji>
                {matches[index].replace("<kanji>", "").replace("</kanji>", "")}
              </Kanji>
            ) : matches[index]?.includes("vocabulary>") ? (
              <Vocab>
                {matches[index]
                  .replace("<vocabulary>", "")
                  .replace("</vocabulary>", "")}
              </Vocab>
            ) : matches[index]?.includes("reading>") ? (
              <Reading>
                {matches[index]
                  .replace("<reading>", "")
                  .replace("</reading>", "")}
              </Reading>
            ) : matches[index]?.includes("ja>") ? (
              <Ja>{matches[index].replace("<ja>", "").replace("</ja>", "")}</Ja>
            ) : (
              <>{matches[index]}</>
            ))}
        </FormattedPartWrap>
      ))}
    </P>
  );
};

const FormattedPartWrap = styled(P)`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Highlight = styled(P)`
  font-weight: ${({ theme }) => theme.fontWeight.heavy};
`;

const Radical = styled(Highlight)`
  color: ${({ theme }) => theme.colors.radicalBorder};
`;

const Kanji = styled(Highlight)`
  color: ${({ theme }) => theme.colors.kanjiBorder};
`;

const Vocab = styled(Highlight)`
  color: ${({ theme }) => theme.colors.vocabBorder};
`;

const Reading = styled(Highlight)`
  color: ${({ theme }) => theme.colors.burnedBg};
`;

const Ja = styled(P)`
  color: ${({ theme }) => theme.colors.burnedBg};
`;
