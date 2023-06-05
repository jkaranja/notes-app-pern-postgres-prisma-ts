//module augmentation allows us to extend the functionality of other modules
//d.ts file are picked by TypeScript automatically//if not d.ts, you will need to add file in include inside tsconfig
//must import below  styles library
import "@material-ui/core/styles";

declare module "@mui/material/styles" {
  //OPTION1: below 2 interfaces handle custom colors//PaletteOptions alone also works//interface Palette not needed
  interface Palette {
    custom: Palette["primary"];
    muted: PaletteOptions["primary"];
    dull: PaletteOptions["primary"];
    dark: PaletteOptions["primary"];
    gray: PaletteOptions["primary"];
  }
  interface PaletteOptions {
    custom: PaletteOptions["primary"];
    muted: PaletteOptions["primary"];
    dull: PaletteOptions["primary"];
    dark: PaletteOptions["primary"];
    gray: PaletteOptions["primary"];
  }

  //OPTION2: USING ONLY ONE INTERFACE TO ADD CUSTOM COLOR
  // interface PaletteOptions {
  //   custom: PaletteColorOptions;
  // }

  //below 2 interfaces handle color token outside of (light, main, dark, and contrastText) eg darker or lighter if added in custom colors
  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }

  //HANDLE COLOR OUTSIDE OF PALLETTE
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }
}
