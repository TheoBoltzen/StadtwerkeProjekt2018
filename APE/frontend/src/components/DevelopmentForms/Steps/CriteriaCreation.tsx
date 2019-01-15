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
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import CustomizedRadio from "../../General/CustomizedRadio";

interface Props extends WithStyles<typeof styles> {
  developmentForm: Competence[];
  onChange?: (index, index2, index3, index4) => void;
  onClickAddButton: (index, index2, index3) => void;
  classes: any;
  name: string;
  handleToggle: (e, index, index2, index3, index4) => void;
}

export interface Criteria {
  name: string;
  checked: boolean;
  value: string;
  imported: boolean;
}

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

class CriteriaCreation extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      checked: [0]
    };
  }

  handleRename = (event: any, index, index2, index3, index4) => {
    const target = event.currentTarget;
    this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].Criteria[
      index4
    ].name = target.value;

    // forceUpdate() eher hacky, aber Ansatz über this.setState(this.state) zum rerendern funktioniert nicht.
    this.forceUpdate();
  };

  handleCompetenceClick = (event: any, index) => {
    if (this.props.developmentForm[index].open) {
      this.props.developmentForm[index].open = false;
    } else {
      this.props.developmentForm.map(c => (c.open = false));
      this.props.developmentForm[index].open = true;
    }
    this.forceUpdate();
  };

  handleMainCategoryClick = (event: any, index, index2) => {
    if (this.props.developmentForm[index].MainCategories[index2].open) {
      this.props.developmentForm[index].MainCategories[index2].open = false;
    } else {
      this.props.developmentForm[index].MainCategories.map(m => (m.open = false));
      this.props.developmentForm[index].MainCategories[index2].open = true;
    }
    this.forceUpdate();
  };

  handleSubCategoryClick = (event: any, index, index2, index3) => {
    if (this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].open) {
      this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].open = false;
    } else {
      this.props.developmentForm[index].MainCategories[index2].SubCategories.map(
        s => (s.open = false)
      );
      this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].open = true;
    }
    this.forceUpdate();
  };

  handleRadioClick = (event: any, index, index2, index3, index4, value) => {
    this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].Criteria[
      index4
    ].value = value;
    this.forceUpdate();
  };

  //TODO Tooltip anpassen
  description =
    "Durch einen Klick auf ein Plus-Symbol, wird zu der darüber liegenden Unterkategorie " +
    "ein Kriterium erstellt. Durch die rechts davon liegenden Auswahlfelder kann  " +
    "der Wert des Soll-Zustandes festgelegt werden.";

  render() {
    const { developmentForm, classes, onClickAddButton } = this.props;

    return (
      <div className={"step3"}>
        <div className={"taskDescription"}>
          <Typography variant={"subtitle2"}>
            Erstellung und Benennung von Kriteren, sowie die Festlegung des Soll-Zustandes.
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
                        style={{ color: "black", width: 1200 }}
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
                                dense={false}
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
                                  style={{ color: "black", width: 1200 }}
                                />
                                {mainCategories.open ? <ExpandLess /> : <ExpandMore />}
                              </ListItem>
                              <Collapse in={mainCategories.open} timeout={"auto"} unmountOnExit>
                                {mainCategories.SubCategories.map(
                                  (subCategories, index3) =>
                                    subCategories.checked && (
                                      <div key={index3}>
                                        <ListItem
                                          button
                                          dense={true}
                                          divider={true}
                                          name={"developmentForm"}
                                          className={classes.nested}
                                          onClick={e => {
                                            this.handleSubCategoryClick(e, index, index2, index3);
                                          }}>
                                          <InputBase
                                            disabled={true}
                                            className={classes.nested}
                                            value={subCategories.name}
                                            style={{ color: "black", width: 1200 }}
                                            name={name}
                                          />
                                          {subCategories.open ? <ExpandLess /> : <ExpandMore />}
                                        </ListItem>

                                        <Collapse
                                          in={subCategories.open}
                                          timeout={"auto"}
                                          unmountOnExit>
                                          {subCategories.Criteria.map((criteria, index4) => {
                                            return (
                                              <div key={index4}>
                                                <ListItem
                                                  dense={true}
                                                  divider={true}
                                                  name={"developmentForm"}
                                                  className={classes.nested}>
                                                  <MuiThemeProvider theme={theme}>
                                                    <Checkbox
                                                      checked={criteria.checked}
                                                      onClick={e => {
                                                        this.props.handleToggle(
                                                          e,
                                                          index,
                                                          index2,
                                                          index3,
                                                          index4
                                                        );
                                                      }}
                                                    />
                                                  </MuiThemeProvider>
                                                  <InputBase
                                                    className={classes.nested}
                                                    value={criteria.name}
                                                    onChange={e => {
                                                      this.handleRename(
                                                        e,
                                                        index,
                                                        index2,
                                                        index3,
                                                        index4
                                                      );
                                                    }}
                                                    style={{ width: 800, color: "black" }}
                                                    name={name}
                                                    disabled={criteria.imported}
                                                  />
                                                  <ListItemSecondaryAction>
                                                    <FormControl component={"fielsdset"}>
                                                      <RadioGroup
                                                        aria-label={"value"}
                                                        name={"value"}
                                                        value={criteria.value}
                                                        row>
                                                        <FormControlLabel
                                                          value={"1"}
                                                          control={<CustomizedRadio />}
                                                          label={"1"}
                                                          onClick={e => {
                                                            this.handleRadioClick(
                                                              e,
                                                              index,
                                                              index2,
                                                              index3,
                                                              index4,
                                                              "1"
                                                            );
                                                          }}
                                                        />
                                                        <FormControlLabel
                                                          value={"2"}
                                                          control={<CustomizedRadio />}
                                                          label={"2"}
                                                          onClick={e => {
                                                            this.handleRadioClick(
                                                              e,
                                                              index,
                                                              index2,
                                                              index3,
                                                              index4,
                                                              "2"
                                                            );
                                                          }}
                                                        />
                                                        <FormControlLabel
                                                          value={"3"}
                                                          control={<CustomizedRadio />}
                                                          label={"3"}
                                                          onClick={e => {
                                                            this.handleRadioClick(
                                                              e,
                                                              index,
                                                              index2,
                                                              index3,
                                                              index4,
                                                              "3"
                                                            );
                                                          }}
                                                        />
                                                        <FormControlLabel
                                                          value={"4"}
                                                          control={<CustomizedRadio />}
                                                          label={"4"}
                                                          onClick={e => {
                                                            this.handleRadioClick(
                                                              e,
                                                              index,
                                                              index2,
                                                              index3,
                                                              index4,
                                                              "4"
                                                            );
                                                          }}
                                                        />
                                                        <FormControlLabel
                                                          value={"5"}
                                                          control={<CustomizedRadio />}
                                                          label={"5"}
                                                          onClick={e => {
                                                            this.handleRadioClick(
                                                              e,
                                                              index,
                                                              index2,
                                                              index3,
                                                              index4,
                                                              "5"
                                                            );
                                                          }}
                                                        />
                                                      </RadioGroup>
                                                    </FormControl>
                                                  </ListItemSecondaryAction>
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
                                              onClick={() =>
                                                onClickAddButton(index, index2, index3)
                                              }>
                                              <AddIcon />
                                            </Button>
                                          </div>
                                        </Collapse>
                                      </div>
                                    )
                                )}
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

export default withStyles(styles)(CriteriaCreation);
