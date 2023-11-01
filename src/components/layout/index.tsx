import { ReactNode } from "react";
import Navigation from "../navigation";
import { createTheme, ThemeProvider } from "@mui/material";
import getDesignTokens from "../../utils/getDesignTokens";
import { useColorMode } from "../../hooks/useColorMode";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { isColorMode } = useColorMode();
  const darkModeTheme = createTheme(getDesignTokens(isColorMode));

  return (
    <ThemeProvider theme={darkModeTheme}>
      <Navigation />
      {children}
    </ThemeProvider>
  );
}
