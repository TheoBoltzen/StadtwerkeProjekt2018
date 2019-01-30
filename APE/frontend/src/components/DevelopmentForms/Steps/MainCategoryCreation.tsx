import {
  Button,
  Checkbox,
  InputBase,
  List,
  ListItem,
  Typography,
  WithStyles
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import * as React from "react";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { styles } from "../mUIstyles";
import { Competence } from "./CompetenceCreation";
import AddIcon from "@material-ui/icons/Add";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse/Collapse";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import withStyles from "@material-ui/core/styles/withStyles";
import "./MainCategoryCreation.css";
import { SubCategory } from "./SubCategoryCreation";

interface Props extends WithStyles<typeof styles> {
  developmentForm: Competence[];
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onClickAddButton: (index) => void;
  classes: any;
  name: string;
  handleToggle: (e, index, index2) => void;
}

export interface MainCategory {
  name: string;
  checked: boolean;
  open: boolean;
  SubCategories: SubCategory[];
  imported: boolean;
}

/** MUI theme creation **/
const theme = createMuiTheme({
  overrides: {
    MuiCheckbox: {
      root: {
        color: "#1A223A !important",
        "&$checked": {
          color: "#00beff !important"
        }
      },
      checked: {}
    }
  }
});

class MainCategoryCreation extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      checked: [0]
    };
  }

  //Function for handling a rename of a main category
  handleRename = (event: any, index, index2) => {
    const target = event.currentTarget;
    this.props.developmentForm[index].MainCategories[index2].name = target.value;
    this.forceUpdate();
  };

  //Function to open or close a category
  handleClick = (event: any, index) => {
    if (this.props.developmentForm[index].open) {
      this.props.developmentForm[index].open = false;
    } else {
      this.props.developmentForm.map(c => (c.open = false));
      this.props.developmentForm[index].open = true;
    }
    this.forceUpdate();
  };

  description =
    "Durch einen Klick auf ein Plus-Symbol, wird zu der darüber liegenden Kompetenzkategorie " +
    "eine Hauptkategorie erstellt. Doppelklick auf den Namen der Hauptkategorie ermöglicht " +
    "es diese umzubennen.";

  render() {
    const { developmentForm, classes, onClickAddButton } = this.props;

    return (
      <div className={"step3"}>
        <div className={"taskDescription"}>
          <Typography variant={"subtitle2"}>
            Erstellung, Benennung und Auswahl von Hauptkategorien für zugehörige Kompetenzen
          </Typography>
          <Tooltip title={this.description}>
            <InfoIcon className={classes.infoIcon} color={"disabled"} />
          </Tooltip>
        </div>
        <div className={"step3form"}>
          <List className={"list"}>
            {developmentForm.map(
              (competence, index) =>
                competence.checked && (
                  <div key={index}>
                    <ListItem
                      button
                      dense={true}
                      divider={true}
                      name={"developmentForm"}
                      onClick={e => {
                        this.handleClick(e, index);
                      }}>
                      <InputBase
                        disabled={true}
                        className={classes.disabledInputBase}
                        value={competence.name}
                        name={name}
                        style={{ color: "black", width: 1200 }}
                      />
                      {competence.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={competence.open} timeout={"auto"} unmountOnExit>
                      {competence.MainCategories.map((mainCategories, index2) => {
                        return (
                          <List key={index2}>
                            <ListItem
                              dense={true}
                              divider={true}
                              name={"developmentForm"}
                              className={classes.nested}>
                              <MuiThemeProvider theme={theme}>
                                <Checkbox
                                  checked={mainCategories.checked}
                                  onClick={e => {
                                    this.props.handleToggle(e, index, index2);
                                  }}
                                />
                              </MuiThemeProvider>
                              <InputBase
                                className={classes.margin}
                                value={mainCategories.name}
                                onChange={e => {
                                  this.handleRename(e, index, index2);
                                }}
                                style={{ width: 1200, color: "black" }}
                                name={name}
                                disabled={mainCategories.imported}
                              />
                            </ListItem>
                          </List>
                        );
                      })}
                      <div className={"buttonFlex"}>
                        <div />
                        <Button
                          color={"primary"}
                          variant={"fab"}
                          aria-label={"Add"}
                          mini
                          className={"AddIcon"}
                          onClick={() => onClickAddButton(index)}>
                          <AddIcon />
                        </Button>
                      </div>
                    </Collapse>
                  </div>
                )
            )}
          </List>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MainCategoryCreation);
