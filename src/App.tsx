import { useState } from "react";
import { useFetch } from "./domain/api";
import { HomePage } from "./pages";
import { url } from "./utils/config";

function App() {
  const [countryName, setCountryName] = useState("");
  const [regionName, setRegionName] = useState("");
  const { data: countries, loading } = useFetch("/all");
  const { data: country } = useFetch(`${url}/name/${countryName}`);
  const { data: region } = useFetch(`${url}/region/${regionName}`);

  if (countryName.length > 0) {
    return (
      <HomePage
        payload={country}
        setCountryName={setCountryName}
        setRegionName={setRegionName}
        regionName={regionName}
        loading={loading}
      />
    );
  }

  if (regionName.length > 0) {
    return (
      <HomePage
        payload={region}
        setCountryName={setCountryName}
        setRegionName={setRegionName}
        regionName={regionName}
        loading={loading}
      />
    );
  }

  return (
    <HomePage
      payload={countries}
      setCountryName={setCountryName}
      setRegionName={setRegionName}
      regionName={regionName}
      loading={loading}
    />
  );
}

export default App;
