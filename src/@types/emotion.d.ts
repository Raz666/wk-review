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
      subjectText: string;
    };
    fontSize: {
      small: number;
      default: number;
      h1: number;
      h2: number;
      h3: number;
    };
    fontWeight: {
      light: string;
      regular: string;
      bold: string;
    };
  }
}
