/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import styles from "./card.module.scss";

export default function CardCountry({
  country,
  navigate,
}: {
  country: any;
  navigate: (id: string) => void;
}) {
  const flag = country?.flags?.svg;

  const capital: string = country?.capital?.map((item: string) => {
    return item;
  });

  return (
    <>
      <Card
        sx={{ maxWidth: 300 }}
        style={{ boxShadow: "0px 5px 10px rgba(0,0,0,0.5)", cursor: "pointer" }}
      >
        <div onClick={() => navigate(country.name.common)}>
          <CardMedia component="img" alt={country.name.common} height="140" image={flag} />
          <CardContent>
            <div className={styles.card__title}>
              <h1>{country.name.common}</h1>
            </div>
            <div className={styles.card__desc}>
              <label>Population:</label>
              <p>{country.population}</p>
            </div>
            <div className={styles.card__desc}>
              <label>Region:</label>
              <p>{country.region}</p>
            </div>
            <div className={styles.card__desc}>
              <label>Capital:</label>
              <p>{capital}</p>
            </div>
          </CardContent>
        </div>
        {/* <CardActions>
          <button onClick={() => addFavourite()}>Add to Fav</button>
        </CardActions> */}
      </Card>
    </>
  );
}
