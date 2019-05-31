import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Instruction from "./Instruction";
import Iframe from "react-iframe";

const styles = {
  height: "80vh",
  position: "relative",
  top: "20%",
  left: "5%",
  overflow: "auto",
  instructionBody: {
    margin: "2rem"
  }
};
class Lesson extends Component {
  render() {
    return (
      <Iframe
        url="http://3.15.133.7:8443"
        position="absolute"
        height="100%"
        width="70%"
      />
    );
  }
}

export default Lesson;
