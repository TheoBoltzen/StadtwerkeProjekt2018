export const styles = theme => ({
  root: {
    width: "90%"
  },
  stepper: {
    backgroundColor: "#f9f9f9",
    iconColor: "#00a8e1"
  },
  margin: {
    margin: theme.spacing.unit
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  primaryButton: {
    backgroundColor: "#00a8e1 !important",
    color: "white"
  },
  step: {
    iconColor: "#1A223A"
  },
  deleteButton: {
    button: {
      margin: theme.spacing.unit
    },
    input: {
      display: "none"
    }
  },
  infoIcon: {
    marginLeft: `${10}px`,
    "&:hover": {
      color: "black"
    },
    nested: {
      paddingLeft: theme.spacing.unit * 4
    }
  }
});
