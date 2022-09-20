import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


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
      <hr></hr>
      <div className="badge bg-primary m-3">v.22.09.21</div>
    </BrowserRouter>
  );
}

const Home = () => {
  return <div className="m-3">
    <h1>Welcome to confluence!</h1>
    <hr></hr>
    <img className="img img-fluid" src="https://cs-develop.ru/files/20220920/1663648922578_cat_programmist.gif" alt="кот программист"></img>
    </div>
};

