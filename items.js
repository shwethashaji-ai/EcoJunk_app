import { useState, useEffect } from "react";
import { fetchItems } from "../api";

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await fetchItems();
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    loadItems();
  }, []);

  return (
    <div>
      <h2>Available Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Category: {item.category}</p>
            <p>Price: ${item.price}</p>
            <img src={`http://localhost:5003${item.imageUrl}`} alt={item.name} width="150" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
