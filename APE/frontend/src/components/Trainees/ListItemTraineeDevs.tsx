import * as React from "react";
import "../DevelopmentForms/ListItem.css";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton, Tooltip } from "@material-ui/core";
import { DevSheetStatusConstants } from "../../constants";

/** Interface declaration **/
interface Props {
  department: string;
  education: string;
  createdAt: string;
  updatedAt?: string;
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
    createdAt,
    status,
    trainerUsername,

    isHeader,
    onSearchClick,
    onEditClick
  } = props;

  return (
    <div className={isHeader ? "headerRow" : "item"}>
      <table>
        <tbody>
          <tr>
            <td>{department}</td>
            <td>{education}</td>
            <td>{createdAt}</td>
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
                  <Tooltip title={"Ausfüllen"} onClick={onEditClick}>
                    <IconButton
                      disabled={
                        status === DevSheetStatusConstants.estimated ||
                        (status === DevSheetStatusConstants.assigned && !trainerUsername) ||
                        status === DevSheetStatusConstants.completed
                      }>
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
