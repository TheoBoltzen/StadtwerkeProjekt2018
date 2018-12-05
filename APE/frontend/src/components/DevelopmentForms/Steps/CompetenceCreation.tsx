import {
  Button,
  InputBase,
  List,
  ListItem,
  Checkbox,
  Typography,
  WithStyles,
  withStyles
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import InfoIcon from "@material-ui/icons/Info";
import * as React from "react";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import { styles } from "../mUIstyles";
import "./CompetenceCreation.css";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import { MainCategory } from "./MainCategoryCreation";

interface Props extends WithStyles<typeof styles> {
  developmentForm: Competence[];
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onClickAddButton: () => void;
  classes: any;
  name: string;
}

export interface Competence {
  name: string;
  checked: boolean;
  MainCategories: MainCategory[];
  open: boolean;
}

const theme = createMuiTheme({
  overrides: {
    MuiCheckbox: {
      root: {
        color: "#1A223A !important",
        "&$checked": {
          color: "#00a8e1 !important"
        }
      },
      checked: {}
    }
  }
});

class CompetenceCreation extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  handleRename = (event: any, id) => {
    const target = event.currentTarget;
    this.props.developmentForm[id].name = target.value;

    // forceUpdate() eher hacky, aber Ansatz über this.setState(this.state) zum rerendern funktioniert nicht.
    this.forceUpdate();
  };

  handleToggle = (event: any, index) => {
    if (this.props.developmentForm[index].checked) {
      this.props.developmentForm[index].checked = false;
    } else {
      this.props.developmentForm[index].checked = true;
    }
    this.forceUpdate();
    console.log("Props: ", this.props);
  };

  description =
    "Neue Kompetenzkategorien können über das Plus-Symbol erstellt werden. Doppelklick auf eine" +
    " Kompetenzkategorie ermöglicht es diese Kategorie umzubennen.";

  render() {
    const { developmentForm, onClickAddButton, name, classes } = this.props;

    return (
      <div className={"step2"}>
        <div className={"taskDescription"}>
          <Typography variant={"subtitle2"}>
            Erstellung, Benennung und Auswahl von Kompetenzkategorien
          </Typography>
          <Tooltip title={this.description}>
            <InfoIcon className={classes.infoIcon} color={"disabled"} />
          </Tooltip>
        </div>
        <div className={"step2form"}>
          <List className={"list"}>
            {developmentForm.map((competence, index) => (
              <ListItem dense={true} divider={true} key={index} name={"developmentForm"}>
                <MuiThemeProvider theme={theme}>
                  <Checkbox
                    className={classes.checkBox}
                    checked={this.props.developmentForm[index].checked}
                    onClick={e => {
                      this.handleToggle(e, index);
                    }}
                  />
                </MuiThemeProvider>
                <InputBase
                  className={this.props.classes.margin}
                  value={developmentForm[index].name}
                  onChange={e => {
                    this.handleRename(e, index);
                  }}
                  name={name}
                />
              </ListItem>
            ))}
          </List>
          <Button
            color={"primary"}
            variant={"fab"}
            mini
            aria-label={"Add"}
            className={"AddIcon"}
            onClick={onClickAddButton}>
            <AddIcon />
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CompetenceCreation);
