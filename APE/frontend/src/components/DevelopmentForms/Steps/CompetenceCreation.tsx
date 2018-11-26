import { Button, InputBase, List, ListItem } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import * as React from "react";

interface Props {
  developmentForm: string[];
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onClickAddButton: () => void;
  classes: any;
}

export const CompetenceCreation = (props: Props) => {
  const { developmentForm, onChange, onClickAddButton } = props;

  return (
    <div className={"step2"}>
      <List className={"list"}>
        {developmentForm.map((competence, index) => (
          <ListItem
            dense={true}
            divider={true}
            key={index}
            name={"developmentForm"}
            onChange={onChange}>
            <InputBase className={props.classes.margin} value={developmentForm[index]} />
          </ListItem>
        ))}
      </List>
      <Button
        color={"primary"}
        variant={"fab"}
        mini
        aria-label={"Add"}
        className={props.classes.addButton}
        onClick={onClickAddButton}>
        <AddIcon />
      </Button>
    </div>
  );
};
