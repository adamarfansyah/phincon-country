/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardCountry } from "../../components";
import styles from "./home.module.scss";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const BENUA = [
  {
    id: 1,
    name: "Africa",
  },
  {
    id: 2,
    name: "America",
  },
  {
    id: 3,
    name: "Asia",
  },
  {
    id: 4,
    name: "Europe",
  },
  {
    id: 5,
    name: "Oceania",
  },
];

export default function HomePage({
  payload,
  setCountryName,
  setRegionName,
  regionName,
  loading,
}: {
  payload: any;
  setCountryName: (countryName: string) => void;
  setRegionName: (regionName: string) => void;
  regionName: string;
  loading: boolean;
}) {
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`/detail/${id}`, { state: { id } });
  };

  const handleBenua = (e: SelectChangeEvent) => {
    setRegionName(e.target.value as string);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setCountryName(inputValue);
  };

  if (payload.length <= 0) {
    <div className={styles.homePage}>
      <Input onChange={handleOnChange} />
      <h1>Something get wrong</h1>
    </div>;
  }

  if (loading) return <div className={styles.homePage}>Loading...</div>;

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__filtered}>
        <div className={styles.homePage__input}>
          <SearchIcon />
          <Input onChange={handleOnChange} placeholder="Filter by country name" />
        </div>
        <div className={styles.homePage__filter}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter by Region</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={regionName}
              label="Filter by region"
              onChange={handleBenua}
            >
              <MenuItem value={""}>All</MenuItem>
              {BENUA.map((item: any) => {
                return (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={styles.card__container}>
        {payload?.map((item: any, idx: any) => (
          <CardCountry key={idx} country={item} navigate={handleNavigate} />
        ))}
      </div>
    </div>
  );
}
