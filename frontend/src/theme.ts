import { createTheme } from "@mui/material";


export const themeSettings = (prefersDarkMode: boolean) => {
  // Create a theme instance.
  const theme = createTheme({
    //palette colors can be accessed as color ='primary' or bg color: "primary.main/light/dark"(just primary won't work here)
    palette: {
      //mode: prefersDarkMode ? "dark" : "light",
      primary: {
        // light: will be calculated from palette.primary.main,
        main: "#1976d2",
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      error: {
        main: "#d32f2f",
      },
      info: {
        main: "#0288d1",
      },
      success: {
        main: "#2e7d32",
      },
      secondary: {
        // main: "#9c27b0",
        main: "#673ab7",
      },
      warning: {
        main: "#ed6c02",
      },

      // Provide every color token (light, main, dark, and contrastText)//optional/main only is ok// when using
      // custom colors for props in Material UI's components.
      // Then you will be able to use it like this: `<Button color="custom">`//in others as custom.main
      // (For TypeScript, you need to add module augmentation for the `custom` value)
      //you can call custom.dark or .light in other props or sx//not in color prop
      custom: {
        light: "#ffa726",
        main: "#f57c00",
        dark: "#ef6c00",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      muted: {
        main: "rgba(0, 0, 0, 0.6)",
      },
      //dull background//don't use grey, already defined in Material UI somewhere
      gray: {
        main: "rgb(249, 250, 251)",
        dark: "rgb(158, 158, 158)", //for progress/spinner
      },
      //lavender//eg in iconBtn background
      dull: {
        main: "#f0f1fd",
      },
      dark: {
        main: "rgb(16, 24, 40)",
      },
    },

    typography: {
      h1: {
        fontWeight: 700,
      },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 500 },
      h4: { fontWeight: 500 },
      h5: { fontWeight: 500 },
      h6: { fontWeight: 500 },
      body1: {},
      body2: {},
      subtitle1: { fontWeight: 500 },
      subtitle2: {},
    },
    //can also add color outside of pallette//but you will have to get it manually
    //const theme = useTheme();
    // const status = theme.status.danger;
    status: {
      danger: "red",
    },
  });

  return theme;
};