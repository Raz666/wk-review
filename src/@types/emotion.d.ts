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
      levelBg: string;
      levelText: string;
      kanjiBg: string;
      radicalBg: string;
      burnedBg: string;
      subjectText: string;
    };
    fontSize: {
      h1: number;
      h2: number;
      h3: number;
      badge: number;
      default: number;
      small: number;
    };
    fontWeight: {
      light: string;
      regular: string;
      bold: string;
    };
  }
}
