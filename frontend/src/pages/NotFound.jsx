import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ 
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{fontSize:"64px"}}>404</h1>
      <p>Page Not Found</p>

      <Link to="/">
        Go back home
      </Link>
    </div>
  );
}