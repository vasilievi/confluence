import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import ArticleView from "./ArticleView"
import ArticleEdit from "./ArticleEdit"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:path" element={<ArticleView />} />
        <Route path="/edit/:path" element={<ArticleEdit />} />
      </Routes>
      <div className="badge bg-primary m-3">v.220919</div>
    </BrowserRouter>
  );
}

const Home = () => <h1>Welcome to confluence!</h1>;

