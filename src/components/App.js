import React, { Component } from "react";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      secondName: "",
      future: ""
    };
  }

  handleChange = (key, e) => {
    this.setState({
      [key]: e.target.value
    });
  };

  relationShipFuture = () => {
    const { firstName, secondName } = this.state;

    if (!firstName || !secondName) {
      this.setState({ future: "Please Enter valid input" });
      return;
    }

    // Step 1: Clean names (case-sensitive handling)
    let name1 = firstName.replace(/\s+/g, "");
    let name2 = secondName.replace(/\s+/g, "");

    // Step 2: Remove common letters
    let arr1 = name1.split("");
    let arr2 = name2.split("");

    for (let i = 0; i < arr1.length; i++) {
      const index = arr2.indexOf(arr1[i]);
      if (index !== -1) {
        arr1[i] = "";
        arr2[index] = "";
      }
    }

    // Step 3: Count remaining letters
    const count = (arr1.join("") + arr2.join("")).length;

    if (count === 0) {
      this.setState({ future: "Siblings" });
      return;
    }

    // Step 4: Apply FLAMES logic based on modulus
    const mod = count % 6;

    const resultMap = {
      1: "Friends",
      2: "Love",
      3: "Affection",
      4: "Marriage",
      5: "Enemy",
      0: "Siblings"
    };

    this.setState({ future: resultMap[mod] });
  };

  clearBtn = () => {
    this.setState({
      firstName: "",
      secondName: "",
      future: ""
    });
  };

  render() {
    return (
      <div id="main">
        <input
          data-testid="input1"
          name="name1"
          type="text"
          placeholder="Enter First Name"
          value={this.state.firstName}
          onChange={(e) => this.handleChange("firstName", e)}
        />

        <input
          data-testid="input2"
          name="name2"
          type="text"
          placeholder="Enter Second Name"
          value={this.state.secondName}
          onChange={(e) => this.handleChange("secondName", e)}
        />

        <button
          data-testid="calculate_relationship"
          name="calculate_relationship"
          onClick={this.relationShipFuture}
        >
          Calculate Relationship Future
        </button>

        <button
          data-testid="clear"
          name="clear"
          onClick={this.clearBtn}
        >
          Clear
        </button>

        <h3 data-testid="answer">{this.state.future}</h3>
      </div>
    );
  }
}

export default App;
