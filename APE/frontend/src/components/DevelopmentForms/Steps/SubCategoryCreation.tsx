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
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import { styles } from "../mUIstyles";
import { Competence } from "./CompetenceCreation";
import AddIcon from "@material-ui/icons/Add";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Collapse from "@material-ui/core/es/Collapse/Collapse";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";
import withStyles from "@material-ui/core/es/styles/withStyles";
import "./MainCategoryCreation.css";
import { Criteria } from "./CriteriaCreation";

interface Props extends WithStyles<typeof styles> {
  developmentForm: Competence[];
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onClickAddButton: (index, index2) => void;
  classes: any;
  name: string;
}

export interface SubCategory {
  name: string;
  checked: boolean;
  open: boolean;
  Criteria: Criteria[];
  imported: boolean;
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

class SubCategoryCreation extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      checked: [0]
    };
  }

  handleRename = (event: any, index, index2, index3) => {
    const target = event.currentTarget;
    this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].name =
      target.value;

    // forceUpdate() eher hacky, aber Ansatz über this.setState(this.state) zum rerendern funktioniert nicht.
    this.forceUpdate();
  };

  handleToggle = (event: any, index, index2, index3) => {
    if (this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].checked) {
      this.props.developmentForm[index].MainCategories[index2].SubCategories[
        index3
      ].checked = false;
    } else {
      this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].checked = true;
    }
    this.forceUpdate();
  };

  handleCompetenceClick = (event: any, index) => {
    if (this.props.developmentForm[index].open) {
      this.props.developmentForm[index].open = false;
    } else {
      this.props.developmentForm[index].open = true;
    }
    this.forceUpdate();
  };

  handleMainCategoryClick = (event: any, index, index2) => {
    if (this.props.developmentForm[index].MainCategories[index2].open) {
      this.props.developmentForm[index].MainCategories[index2].open = false;
    } else {
      this.props.developmentForm[index].MainCategories[index2].open = true;
    }
    this.forceUpdate();
  };

  description =
    "Durch einen Klick auf ein Plus-Symbol, wird zu der darüber liegenden Hauptkategorie " +
    "eine Unterkategorie erstellt. Doppelklick auf den Namen der Unterkategorie ermöglicht " +
    "es diese umzubennen.";

  render() {
    const { developmentForm, classes, onClickAddButton } = this.props;

    //TODO für jeden erstellten Kompetenzblock einen farbigen Hintergrund erstellen, um Zugehörigkeit der Unterkategorien zu erkennen
    return (
      <div className={"step3"}>
        <div className={"taskDescription"}>
          <Typography variant={"subtitle2"}>
            Erstellung, Benennung und Auswahl von Unterkategorien für zugehörige Hauptkategorien
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
                        this.handleCompetenceClick(e, index);
                      }}>
                      <InputBase
                        disabled={true}
                        className={classes.disabledInputBase}
                        value={competence.name}
                        name={name}
                        style={{ color: "black", width: 800 }}
                      />
                      {competence.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={competence.open} timeout={"auto"} unmountOnExit>
                      {competence.MainCategories.map(
                        (mainCategories, index2) =>
                          mainCategories.checked && (
                            <List key={index2}>
                              <ListItem
                                button
                                dense={true}
                                divider={true}
                                name={"developmentForm"}
                                className={classes.nested}
                                onClick={e => {
                                  this.handleMainCategoryClick(e, index, index2);
                                }}>
                                <InputBase
                                  disabled={true}
                                  className={classes.disabledInputBase}
                                  value={mainCategories.name}
                                  name={name}
                                  style={{ color: "black", width: 800 }}
                                />
                                {mainCategories.open ? <ExpandLess /> : <ExpandMore />}
                              </ListItem>
                              <Collapse in={mainCategories.open} timeout={"auto"} unmountOnExit>
                                {mainCategories.SubCategories.map((subCategories, index3) => {
                                  return (
                                    <div key={index3}>
                                      <ListItem
                                        dense={true}
                                        divider={true}
                                        name={"developmentForm"}
                                        className={classes.nested}>
                                        <MuiThemeProvider theme={theme}>
                                          <Checkbox
                                            checked={subCategories.checked}
                                            onClick={e => {
                                              this.handleToggle(e, index, index2, index3);
                                            }}
                                          />
                                        </MuiThemeProvider>
                                        <InputBase
                                          className={classes.nested}
                                          value={subCategories.name}
                                          onChange={e => {
                                            this.handleRename(e, index, index2, index3);
                                          }}
                                          style={{ width: 800, color: "black" }}
                                          name={name}
                                          disabled={subCategories.imported}
                                        />
                                      </ListItem>
                                    </div>
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
                                    onClick={() => onClickAddButton(index, index2)}>
                                    <AddIcon />
                                  </Button>
                                </div>
                              </Collapse>
                            </List>
                          )
                      )}
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

export default withStyles(styles)(SubCategoryCreation);
