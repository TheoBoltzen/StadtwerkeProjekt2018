import { Button, InputBase, List, ListItem } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import * as React from "react";

interface Props {
  developmentForm: string[];
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onClickAddButton: () => void;
  classes: any;
  name: string;
}

class CompetenceCreation extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  handleRename = (event: any, id) => {
    const target = event.currentTarget;
    const value = target.value;
    this.props.developmentForm[id] = value;

    // Falls forceUpdate() unerwünscht, über setState(this.state) umsetzbar
    this.forceUpdate();
  };

  render() {
    const { developmentForm, onClickAddButton, name } = this.props;

    return (
      <div className={"step2"}>
        <List className={"list"}>
          {developmentForm.map((competence, index) => (
            <ListItem dense={true} divider={true} key={index} name={"developmentForm"}>
              <InputBase
                className={this.props.classes.margin}
                value={developmentForm[index]}
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
    );
  }
}

export default CompetenceCreation;
