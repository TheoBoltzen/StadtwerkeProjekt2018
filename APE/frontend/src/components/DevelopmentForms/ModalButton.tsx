import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import * as React from "react";
import "./ModalButton.css";
import DevelopmentStepper from "./DevelopmentStepper";
import Typography from "@material-ui/core/es/Typography/Typography";

const styles = theme =>
  createStyles({
    paper: {
      position: "absolute",
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4
    }
  });

interface Props extends WithStyles<typeof styles> {}

interface State {
  open: boolean;
}

class ModalButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      open: false
    };
  }

  getModalStyle() {
    const top = 10;
    const left = 5;
    const height = 80;
    const width = 87.5;

    return {
      top: `${top}%`,
      left: `${left}%`,
      height: `${height}%`,
      width: `${width}%`
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>Entwicklungsbogen erstellen</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}>
          <div className={classes.paper} style={this.getModalStyle()}>
            <Typography variant={"h4"} className={"ModalHeader"}>
              Entwicklungsbogen erstellen
            </Typography>
            <DevelopmentStepper />
          </div>
        </Modal>
      </div>
    );
  }
}

// We need an intermediary variable for handling the recursive nesting.
const ModalButtonWrapped = withStyles(styles)(ModalButton);

export default ModalButtonWrapped;
