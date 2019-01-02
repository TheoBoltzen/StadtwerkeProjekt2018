import * as React from "react";
import "../DevelopmentForms/ListItem.css";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton, Tooltip } from "@material-ui/core";

interface Props {
  department: string;
  education: string;
  createdAt?: string;
  updatedAt: string;
  status: string;
  trainerUsername: string;

  isHeader?: boolean;
  onSearchClick?: any;
  onEditClick?: any;
  onAssignMeClick?: any;
}

export const ListItemTraineeDevs = (props: Props) => {
  const {
    department,
    education,
    // createdAt,
    updatedAt,
    status,
    trainerUsername,

    isHeader,
    onSearchClick,
    onEditClick
    // onAssignMeClick
  } = props;

  return (
    <div className={isHeader ? "headerRow" : "item"}>
      <table>
        <tbody>
          <tr>
            <td>{department}</td>
            <td>{education}</td>
            <td>{updatedAt}</td>
            <td>{status}</td>
            <td>{trainerUsername}</td>
            <td>
              {isHeader ? (
                <div />
              ) : (
                <div>
                  <Tooltip title={"Detailansicht"} onClick={onSearchClick}>
                    <IconButton>
                      <SearchIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={"Bearbeiten"} onClick={onEditClick}>
                    <IconButton>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
