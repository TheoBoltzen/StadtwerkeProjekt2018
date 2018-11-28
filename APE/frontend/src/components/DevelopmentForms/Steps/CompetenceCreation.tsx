import { Button, InputBase, List, ListItem, Checkbox, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import * as React from "react";

interface Props {
  developmentForm: Competence[];
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onClickAddButton: () => void;
  classes: any;
  name: string;
}

interface State {
  checked: number[];
}

export interface Competence {
  name: string;
  checked: boolean;
}

class CompetenceCreation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      checked: [0]
    };
  }

  handleRename = (event: any, id) => {
    const target = event.currentTarget;
    this.props.developmentForm[id].name = target.value;
    console.log(this.state);

    // forceUpdate() eher hacky, aber Ansatz über this.setState(this.state) zum rerendern funktioniert nicht.
    this.forceUpdate();
  };

  handleToggle = value => index => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
    console.log(this.state);
  };

  render() {
    const { developmentForm, onClickAddButton, name } = this.props;

    return (
      <div className={"step2"}>
        <Typography variant={"subtitle2"} className={"TaskDescription"}>
          Erstellung von Kompetenzkategorien
        </Typography>
        <div className={"step2form"}>
          <List className={"list"}>
            {developmentForm.map((competence, index) => (
              <ListItem dense={true} divider={true} key={index} name={"developmentForm"}>
                <Checkbox
                  checked={this.state.checked.indexOf(index) !== -1}
                  onClick={this.handleToggle(index)}
                  tabIndex={-1}
                  disableRipple
                />
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
            className={this.props.classes.addButton}
            onClick={onClickAddButton}>
            <AddIcon />
          </Button>
        </div>
      </div>
    );
  }
}

export default CompetenceCreation;
