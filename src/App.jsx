import { render } from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchParams from "./SearchParams.jsx";
import Details from "./Details.jsx";
// this is a function component

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <header>
          <Link to="/">Adopt me!</Link>
        </header>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

/* <Pet name="Mwezi" animal="Cat" breed="Carey" />
<Pet name="Cassandra Claire" animal="Cat" breed="White" />
<Pet name="Lainva" animal="Cat" breed="Tabby" /> */

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, "Adopt Me!"), // the 2nd parametet its to put whatever you want to pass to the element like an id eg. { id; "brand"}
//     React.createElement(Pet, {
//       name: "Mwezi",
//       animal: "Cat",
//       breed: "Carey",
//     }),
//     React.createElement(Pet, {
//       name: "Cassandra Claire",
//       animal: "Cat",
//       breed: "White",
//     }),
//     React.createElement(Pet, {
//       name: "Lainva",
//       animal: "Cat",
//       breed: "Tabby",
//     }),
//   ]);
// };

// by default data flows one way -> parents to children, the children cannot affect the parent
render(
  // ReactDOM.render it is only use once
  <App />, // Its is translated to React.CreateElement
  document.getElementById("root")
);
