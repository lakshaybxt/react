import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="glitch" data-text="404">404</h1>
        <h2>Page Not Found</h2>
        <p>
          The page you’re looking for doesn’t exist <br />
          or it slipped into another dimension.
        </p>

        <div className="actions">
          <button onClick={() => navigate("/")}>Go Home</button>
          <button className="ghost" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound