import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <main className="not-found">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>

      <Link to="/">⬅ Back Home</Link>
    </main>
  );
};

export default NotFoundPage;