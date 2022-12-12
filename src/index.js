import ReactDOM from 'react-dom/client';

import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


import ArticleView from "./ArticleView"
import ArticleEdit from "./ArticleEdit"

const css = `
.wmde-markdown img {
    border-style: solid;
    border-color: bisque;
    border-radius: 10px;
    margin-top: 5px;
}

.wmde-markdown h1 {
  color: indianred;
}

.wmde-markdown h2 {
    color: teal;
}

.wmde-markdown h3 {
  color: darkgoldenrod;
}

/* The snackbar - position it at the bottom and in the middle of the screen */
#snackbar {
  visibility: hidden; /* Hidden by default. Visible on click */
  min-width: 250px; /* Set a default minimum width */
  margin-left: -125px; /* Divide value of min-width by 2 */
  background-color: #333; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  border-radius: 2px; /* Rounded borders */
  padding: 16px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  left: 50%; /* Center the snackbar */
  bottom: 30px; /* 30px from the bottom */
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
  visibility: visible; /* Show the snackbar */
  /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
  However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
.wmde-markdown h3 {
color: chocolate;
}
`

const Home = () => {
  return <div className="m-3">
    <h1>Welcome to confluence!</h1>
    <hr></hr>
    <img className="img img-fluid" src="https://cs-develop.ru/files/20220920/1663648922578_cat_programmist.gif" alt="кот программист"></img>
  </div>
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/view/:path" element={<ArticleView />} />
      <Route path="/edit/:path" element={<ArticleEdit />} />
    </Routes>
    <div className="badge bg-primary m-3">v.22.12.12</div>
    <style>{css}</style>
  </BrowserRouter>
);


