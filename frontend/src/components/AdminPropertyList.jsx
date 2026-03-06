import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./AdminPropertyList.css";

const AdminPropertyList = () => {

  const [properties, setProperties] = useState([]);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchProperties = async (pageNumber = 1) => {
  try {

    const res = await api.get(`/api/properties/all?page=${pageNumber}`);

    setProperties(res.data.properties);
    setTotalPages(res.data.totalPages);
    setPage(res.data.currentPage);

  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  fetchProperties(page);
}, [page]);

  

  return (
<div className="properties-page">

  <div className="properties-topbar">
    <h1 className="page-title">Properties</h1>

    <button
      className="create-property-btn"
      onClick={() => navigate("/admin/create-property")}
    >
      + Create Property
    </button>
  </div>

  <div className="table-card">

    <table className="properties-table">

      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Location</th>
          <th>Price</th>
          <th>Capacity</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {properties.map((property) => (
          <tr key={property._id}>

            <td>
              <img
                src={property.images?.[1] || "https://placehold.co/100x70"}
                alt={property.name}
                className="table-img"
              />
            </td>

            <td>{property.name}</td>

            <td>{property.location}</td>

            <td>₹ {property.price} / night</td>

            <td>{property.capacity}</td>

            <td>
              <button
                className="open-btn"
                onClick={() => navigate(`/admin/edit/${property._id}`)}
              >
                Open
              </button>
            </td>

          </tr>
        ))}

      </tbody>

    </table>
    <div className="pagination">

  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Prev
  </button>

  <span>Page {page} of {totalPages}</span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>

</div>

  </div>

</div>
  );
};

export default AdminPropertyList;