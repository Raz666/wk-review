import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primaryText: string;
      secondaryText: string;
      divider: string;
      buttonBg: string;
      buttonText: string;
      hintBg: string;
      hintText: string;
      progressBarBg: string;
      newBg: string;
      newBorder: string;
      levelBg: string;
      levelBorder: string;
      levelText: string;
      vocabBg: string;
      vocabBorder: string;
      kanjiBg: string;
      kanjiBorder: string;
      radicalBg: string;
      radicalBorder: string;
      burnedBg: string;
      burnedBorder: string;
      subjectText: string;
    };
    fontSize: {
      huge: number;
      h1: number;
      h2: number;
      h3: number;
      h4: number;
      badge: number;
      default: number;
      small: number;
    };
    fontWeight: {
      light: string;
      regular: string;
      medium: string;
      bold: string;
      heavy: string;
    };
  }
}
