import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Instruction from "./Instruction";
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
      <Grid container>
        <Grid item xs={12} sm={4}>
          <Paper style={styles}>
            <Typography variant="h3" align="center">
              Instructions
            </Typography>
            <hr />
            <Typography variant="body1" style={styles.instructionBody}>
              <Instruction />
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Lesson;
