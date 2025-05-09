/**
 *
 * <div id="parent">
 *      <div id="child">
 *          <h1></h1>
 *      </div>
 * </div>
 *
 */

const heading = React.createElement(
  "div",
  { id: "parent" },
  React.createElement(
    "div",
    { id: "child" },
    React.createElement("h1", {}, "Hello World")
  )
);

// const heading = React.createElement(
//   "h1",
//   { id: "heading" },
//   "Hello World Using React"
// );

console.log(heading);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);
