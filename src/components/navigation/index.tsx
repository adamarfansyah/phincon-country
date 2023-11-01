import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import styles from "./navigation.module.scss";
import { useColorMode } from "../../hooks/useColorMode";

export default function Navigation() {
  const { isColorMode, toggleColorMode } = useColorMode();

  return (
    <div className={styles.navbar}>
      <h1 className={styles.navbar__title}>Where in the world?</h1>
      <div className={styles.navbar__right}>
        <div onClick={() => toggleColorMode()} className={styles.navbar__toggle}>
          {isColorMode === "dark" ? (
            <DarkModeOutlinedIcon className={styles.navbar__icon} />
          ) : (
            <Brightness4OutlinedIcon className={styles.navbar__icon} />
          )}
          <label>{isColorMode === "dark" ? "dark" : "light"} Mode</label>
        </div>
      </div>
    </div>
  );
}
