/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch, usePost } from "../../domain/api";
import styles from "./detail.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Info from "../../components/info";
import { url, urlJson } from "../../utils/config";

export default function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: country, loading } = useFetch(`${url}/name/${id}`);
  const { data: favourites } = useFetch(`${urlJson}/favourite`);
  const { mutate } = usePost(`${urlJson}/favourite`);
  const [fav, setFav] = useState(false);
  const [borders, setBorders] = useState([]);
  const [countryData, setCountryData] = useState<any>({
    name: "",
    nativeName: "",
    imgName: "",
    imgAlt: "",
    population: 0,
    region: "",
    subRegion: "",
    capital: "",
    topLevelDomain: "",
    currencies: "",
    languages: "",
    cca3: "",
  });
  const { data: border } = useFetch(`${url}/alpha?codes=${borders!.join(",")}`);

  useEffect(() => {
    countryMap();
  }, [country]);

  const addFavourite = () => {
    navigate("/favourite");
    mutate(country[0]);
  };

  const countryMap = () => {
    country!.map((item: any) => {
      const languageKey = Object.keys(item?.languages);
      const language = languageKey.map((key) => item?.languages[key]);

      const currenciesKey = Object.keys(item?.currencies);
      const currencies = currenciesKey.map((key) => item?.currencies[key]);

      const nativeNameKey = Object.keys(item?.name?.nativeName);
      const nativeName = nativeNameKey.map((key) => item?.name?.nativeName[key]);

      const data = {
        name: item?.name?.common,
        nativeName: nativeName[0].common,
        imgName: item?.flags?.png,
        imgAlt: item?.flags?.alt,
        population: item?.population,
        region: item?.region,
        subRegion: item?.subregion,
        capital: item?.capital?.join(""),
        topLevelDomain: item?.tld.join(""),
        currencies: currencies[0].name,
        languages: language,
        cca3: item?.cca3,
      };
      setBorders(item?.borders);
      setCountryData(data);
    });
  };

  if (loading) {
    return (
      <div className={styles.detail}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className={styles.detail}>
        <div className={styles.detail__btns}>
          <div className={styles.detail__button} onClick={() => navigate("/")}>
            <ArrowBackIcon />
            Go Back
          </div>
          <div className={styles.detail__button} onClick={() => addFavourite()}>
            <FavoriteIcon />
            Add Favourite
          </div>
        </div>
        <div className={styles.detail__wrapper}>
          <img src={countryData.imgName} alt={countryData.imgAlt} className={styles.detail__img} />
          <div className={styles.detail__container}>
            <h1>{countryData.name}</h1>
            <div>
              <div className={styles.detail__descContainer}>
                <div className={styles.detail__desc}>
                  <Info label="Native Name : " text={countryData.nativeName} />
                  <Info label="Population : " text={countryData.population} />
                  <Info label="Region : " text={countryData.region} />
                  <Info label="Sub Region : " text={countryData.subRegion} />
                  <Info label="Capital : " text={countryData.capital} />
                </div>
                <div className={styles.detail__desc}>
                  <Info label="Top Level Domain : " text={countryData.topLevelDomain} />
                  <Info label="Currencies : " text={countryData.currencies} />
                  <Info label="Languages : " text={countryData.languages} />
                </div>
              </div>
              <div className={styles.detail__borders}>
                <p>Border Countries:</p>
                <div className={styles.borders}>
                  {border?.map((item: any, idx: number) => {
                    return (
                      <div key={idx} className={styles.detail__cardBorderCountries}>
                        <label>{item?.name?.common}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
