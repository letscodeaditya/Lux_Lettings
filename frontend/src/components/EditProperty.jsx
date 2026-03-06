import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import imageCompression from "browser-image-compression";
import "./EditProperty.css";

const EditProperty = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    capacity: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [nearbyAttractions, setNearbyAttractions] = useState([]);
  const [nearbyInput, setNearbyInput] = useState("");

  const [msg, setMsg] = useState("");

  // fetch property
  useEffect(() => {

    const fetchProperty = async () => {

      try {

        const res = await api.get(`/api/properties/${id}`);

        const property = res.data;

        setForm({
          name: property.name,
          location: property.location,
          price: property.price,
          description: property.description,
          capacity: property.capacity,
        });

        setNearbyAttractions(property.nearby || []);
        setExistingImages(property.images || []);

      } catch (err) {
        console.error(err);
      }

    };

    fetchProperty();

  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // select new images
  const handleImages = (e) => {

    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);

    const previewUrls = files.map(file => URL.createObjectURL(file));

    setPreview((prev) => [...prev, ...previewUrls]);
  };

  // remove uploaded preview image
  const removeNewImage = (index) => {

    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  // remove existing cloud image
  const removeExistingImage = (index) => {

    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // upload new images
  const uploadImages = async () => {

    const uploads = images.map(async (img) => {

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(img, options);

      const data = new FormData();
      data.append("file", compressedFile);
      data.append("upload_preset", "luxlettings");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dyrdwei8d/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      return result.secure_url;

    });

    return Promise.all(uploads);

  };

  // UPDATE PROPERTY
  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      let imageUrls = [...existingImages];

      if (images.length > 0) {
        const newUploads = await uploadImages();
        imageUrls = [...imageUrls, ...newUploads];
      }

      const body = {
        ...form,
        price: Number(form.price),
        capacity: Number(form.capacity),
        nearby: nearbyAttractions,
        images: imageUrls,
      };

      await api.put(`/api/properties/${id}`, body);

      setMsg("Property updated successfully!");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1200);

    } catch (err) {

      console.error(err);
      setMsg("Update failed");

    }
  };

  // DELETE PROPERTY
  const handleDelete = async () => {

    if (!window.confirm("Delete this property permanently?")) return;

    try {

      await api.delete(`/api/properties/delete/${id}`);

      navigate("/admin/property-list");

    } catch (err) {

      console.error(err);
      setMsg("Delete failed");

    }
  };

  return (
    <div className="form-wrapper">

      <div className="create-property-form">

        <h2>Edit Property</h2>

        {msg && <p className="message">{msg}</p>}

        <form onSubmit={handleUpdate}>

          <label>Property Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <label>Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
          />

          <label>Price per Night</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          {/* EXISTING IMAGES */}

          <label>Current Images</label>

          <div className="image-preview">

            {existingImages.map((img, index) => (

              <div key={index} className="preview-box">

                <img src={img} alt="" />

                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                >
                  ✕
                </button>

              </div>

            ))}

          </div>

          {/* ADD NEW IMAGES */}

          <label>Add New Images</label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
          />

          <div className="image-preview">

            {preview.map((img, index) => (

              <div key={index} className="preview-box">

                <img src={img} alt="" />

                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
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
              value={nearbyInput}
              onChange={(e) => setNearbyInput(e.target.value)}
            />

            <button
              type="button"
              onClick={() => {

                if (nearbyInput.trim() !== "") {

                  setNearbyAttractions([
                    ...nearbyAttractions,
                    nearbyInput
                  ]);

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
          />

          <div className="edit-buttons">
            <div>

            <button type="submit" className="create-btn">
              Save Changes
            </button>

            <button
              type="button"
              className="ad-delete-btn"
              onClick={handleDelete}
              >
              Delete Property
            </button>

                </div>
          </div>

        </form>

      </div>

    </div>
  );
};

export default EditProperty;