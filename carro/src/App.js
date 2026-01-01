import { useState } from "react";
import SearchBar from "../components/SearchBar";
import CarCard from "../components/CarCard";

export default function CarStore() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchCars = async (model) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/cars?model=${model}`,
        {
          headers: { "X-Api-Key": "SUA_API_KEY_AQUI" }
        }
      );

      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Erro ao buscar carros:", error);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🚗 Loja de Carros — Luxo e Populares</h1>

      <SearchBar onSearch={searchCars} />

      {loading && <p>Carregando...</p>}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {cars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </div>
  );
}
