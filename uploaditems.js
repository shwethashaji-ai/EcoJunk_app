import { useState } from "react";
import { uploadItem } from "../api";

const UploadItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("image", formData.image);

    try {
      await uploadItem(data);
      alert("✅ Item Uploaded Successfully!");
    } catch (error) {
      alert("❌ Failed to Upload Item");
    }
  };

  return (
    <div>
      <h2>Upload Item</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Item Name" onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="file" name="image" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadItem;
