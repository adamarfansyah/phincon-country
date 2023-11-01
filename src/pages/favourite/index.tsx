import { useFetch } from "../../domain/api";
import { urlJson } from "../../utils/config";
import { CardCountry } from "../../components";
import { useNavigate } from "react-router-dom";
import styles from "./favourite.module.scss";

export default function FavouritePage() {
  const { data } = useFetch(`${urlJson}/favourite`);
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`/detail/${id}`, { state: { id } });
  };

  const goHomePage = () => {
    navigate(`/`);
  };

  return (
    <div className={styles.card__containers}>
      <button onClick={() => goHomePage()} className={styles.btn}>
        Go Home Page
      </button>
      <div className={styles.card__container}>
        {data?.map((item, idx) => (
          <CardCountry key={idx} country={item} navigate={handleNavigate} />
        ))}
      </div>
    </div>
  );
}
