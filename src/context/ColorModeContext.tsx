import { createContext, useState } from "react";

type Props = {
  isColorMode: "light" | "dark";
  toggleColorMode: () => void;
};

export const ColorModeContext = createContext<Props>({
  isColorMode: "light",
  toggleColorMode: () => {},
});

const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isColorMode, setIsColorMode] = useState<"light" | "dark">("light");

  const toggleColorMode = () => {
    setIsColorMode((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  return (
    <ColorModeContext.Provider value={{ isColorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
