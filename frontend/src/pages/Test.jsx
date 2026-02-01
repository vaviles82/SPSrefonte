import { Link } from "react-router-dom";

function TestPage() {
  return (
    <button>
      <Link to="/product/123">Click me</Link>
    </button>
  );
}
export default TestPage;
