import { createTheme } from "@mui/material";

export const ONSITE_IQ_PURPLE = "#9572f8";
export const SECONDARY_GRAY = "#37464f";

export const theme = createTheme({
  palette: {
    primary: {
      main: ONSITE_IQ_PURPLE,
    },
    secondary: {
      main: SECONDARY_GRAY,
    },
    text: {
      primary: ONSITE_IQ_PURPLE,
      secondary: "white",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        inputProps: {
          style: {
            fontSize: "1.5rem",
            lineHeight: "2rem",
            color: "white",
          },
        },
        InputLabelProps: { style: { fontSize: "1.5rem" } },
      },
    },
    MuiChip: {
      styleOverrides: {
        label: { fontSize: "1.2rem", fontWeight: "bold" },
        root: { margin: "4px" },
      },
    },
  },
});
