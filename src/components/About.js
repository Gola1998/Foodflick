import { Component } from "react";
import User from "./User";
import UserClass from "./UserClass";

class About extends Component {
  constructor(props) {
    super(props);

    console.log("Parent Constructor");
  }

  componentDidMount(){
    console.log("Parent Component Did Mount");
  }

  render() {
    console.log("Parent Render");
    return (
      <div>
        <h1>About</h1>
        <h2>This is Namaste react series</h2>
        <User name={"Gaurav Gola(function)"} />
        <UserClass name={"First"} location={"Delhi"} />
        <UserClass name={"Second"} location={"USA"} />
      </div>
    );
  }
}

export default About;
