export default function CarCard({ car }) {
  const imageUrl = `https://source.unsplash.com/600x400/?${car.make}%20${car.model}`;

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: 20,
      borderRadius: 10,
      width: 300,
      margin: 10
    }}>
      <img
        src={imageUrl}
        alt={car.model}
        style={{ width: "100%", borderRadius: 10 }}
      />
      <h2>{car.make} {car.model}</h2>
      <p><strong>Ano:</strong> {car.year}</p>
      <p><strong>Combustível:</strong> {car.fuel_type}</p>
      <p><strong>Consumo:</strong> {car.city_mpg} km/l</p>
    </div>
  );
}
