import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./StarRating";
import TextExpander from "./TextExpander";

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating */}
    {/*   maxRating={5} */}
    {/*   messages={["terrible", "bad", "okay", "good", "excelent"]} */}
    {/*   defaultRating={3} */}
    {/* /> */}
    {/* <StarRating */}
    {/*   defaultRating={5} */}
    {/*   color="red" */}
    {/*   size={22} */}
    {/*   maxRating={10} */}
    {/*   className="test" */}
    {/* /> */}
    {/* <Test /> */}
    {/* <TextExpander>this is a test</TextExpander> */}
    {/* <TextExpander collapsedNumWords={35}> */}
    {/*   The library was quiet except for the soft rustle of pages turning and the */}
    {/*   occasional creak of an old wooden chair. Dust motes floated lazily in the */}
    {/*   golden afternoon light, and the air smelled faintly of paper and ink. */}
    {/*   Outside, rain tapped gently against the windows, a steady rhythm that made */}
    {/*   the place feel even more like a sanctuary. Rows upon rows of books */}
    {/*   stretched endlessly, each one a doorway into another world, waiting for */}
    {/*   someone curious enough to open it. */}
    {/* </TextExpander> */}
    {/* <TextExpander exapanded={true} buttonColor="red"> */}
    {/*   The library was quiet except for the soft rustle of pages turning and the */}
    {/*   occasional creak of an old wooden chair. Dust motes floated lazily in the */}
    {/*   golden afternoon light, and the air smelled faintly of paper and ink. */}
    {/*   Outside, rain tapped gently against the windows, a steady rhythm that made */}
    {/*   the place feel even more like a sanctuary. Rows upon rows of books */}
    {/*   stretched endlessly, each one a doorway into another world, waiting for */}
    {/*   someone curious enough to open it. */}
    {/* </TextExpander> */}
  </React.StrictMode>,
);
