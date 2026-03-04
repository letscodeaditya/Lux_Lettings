import { useState } from "react";
import api from "../api/axios.js";
import "./CreateProperty.css";

const CreateProperty = () => {

  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    capacity: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const [msg, setMsg] = useState("");

  const [nearbyAttractions, setNearbyAttractions] = useState([]);
  const [nearbyInput, setNearbyInput] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImages = (e) => {

    const files = Array.from(e.target.files);

    setImages(files);

    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreview(previewUrls);
  };

  // Remove image
  const removeImage = (index) => {

    const newImages = images.filter((_, i) => i !== index);
    const newPreview = preview.filter((_, i) => i !== index);

    setImages(newImages);
    setPreview(newPreview);
  };

  // Upload images to cloudinary
  const uploadImages = async () => {

    const urls = [];

    for (const img of images) {

      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "luxlettings");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dyrdwei8d/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const file = await res.json();

      urls.push(file.secure_url);
    }

    return urls;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const imageUrls = await uploadImages();

      const body = {
        name: form.name,
        location: form.location,
        price: Number(form.price),
        description: form.description,
        capacity: Number(form.capacity),
        nearby: nearbyAttractions,
        images: imageUrls
      };

      await api.post("/api/properties", body);

      setMsg("Property created successfully!");

      setForm({
        name: "",
        location: "",
        price: "",
        description: "",
        capacity: "",
      });

      setImages([]);
      setPreview([]);
      setNearbyAttractions([]);

    } catch (err) {

      console.error(err);
      setMsg("Failed to create property");
    }
  };

  return (
    <div className="form-wrapper">

      <div className="create-property-form">

        <h2>Create New Property</h2>

        {msg && <p className="message">{msg}</p>}

        <form onSubmit={handleSubmit}>

          <label>Property Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <label>Price per Night (₹)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            required
          />

          {/* IMAGE UPLOAD */}

          <label>Upload Property Images</label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
          />

          {/* IMAGE PREVIEW */}

          <div className="image-preview">

            {preview.map((img, index) => (
              <div key={index} className="preview-box">

                <img src={img} alt="preview" />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                >
                  ✕
                </button>

              </div>
            ))}

          </div>

          {/* NEARBY */}

          <label>Nearby Attractions</label>

          <div className="nearby-box">

            <input
              type="text"
              value={nearbyInput}
              onChange={(e) => setNearbyInput(e.target.value)}
              placeholder="Add nearby place"
            />

            <button
              type="button"
              className="add-btn"
              onClick={() => {
                if (nearbyInput.trim() !== "") {
                  setNearbyAttractions([...nearbyAttractions, nearbyInput]);
                  setNearbyInput("");
                }
              }}
            >
              Add
            </button>

          </div>

          <ul className="nearby-list">

            {nearbyAttractions.map((item, index) => (
              <li key={index}>

                {item}

                <button
                  type="button"
                  onClick={() =>
                    setNearbyAttractions(
                      nearbyAttractions.filter((_, i) => i !== index)
                    )
                  }
                >
                  ✕
                </button>

              </li>
            ))}

          </ul>

          <label>Guest Capacity</label>

          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            required
          />

          <button type="submit" className="create-btn">
            Create Property
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateProperty;