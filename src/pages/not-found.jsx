import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>

      <Link to="/">⬅ Back Home</Link>
    </div>
  );
};

export default NotFoundPage;