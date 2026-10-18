function Dish({ name, price, category, spicy }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{price} ETB</p>
      <p>{category}</p>

      {spicy && <p>Spicy</p>}
    </div>
  );
}

export default Dish;