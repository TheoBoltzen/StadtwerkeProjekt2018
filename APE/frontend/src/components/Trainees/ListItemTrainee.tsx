import * as React from "react";
import "./ListItemTrainee.css";
import { IconButton, Tooltip } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";

interface Props {
  nameTrainee: string;
  department: string;
  nameTrainer: string;
  status: string;
  isHeader?: boolean;
  onAssignmentClick?: () => void;
  onFilloutClick?: () => void;
}

interface State {}

export class ListItemTrainee extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      department,
      nameTrainee,
      nameTrainer,
      status,
      isHeader = false,
      onAssignmentClick,
      onFilloutClick
    } = this.props;

    return (
      <div className={isHeader ? "trainee-headerRow" : "trainee-item"}>
        <table>
          <tbody>
            <tr>
              <td>{department}</td>
              <td>{nameTrainee}</td>
              <td>{nameTrainer}</td>
              <td>{status}</td>
              <td>
                {!nameTrainer ? (
                  <Tooltip title={"Mir zuweisen"} onClick={onAssignmentClick}>
                    <IconButton>
                      <Favorite fontSize="small" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  !isHeader && (
                    <Tooltip title={"ausfüllen"} onClick={onFilloutClick}>
                      <IconButton>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
