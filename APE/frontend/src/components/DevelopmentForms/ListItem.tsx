import * as React from "react";
import "./ListItem.css";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import ShareIcon from "@material-ui/icons/Share";
import { IconButton, Tooltip } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";

interface Props {
  abteilung: string;
  job: string;
  date: string;
  version: string;
  isTrainee?: boolean;
  isHeader?: boolean;
  onSearchClick?: any;
  onEditClick?: any;
  onAssignMeClick?: any;
}

export const ListItem = (props: Props) => {
  const {
    abteilung,
    job,
    date,
    version,
    isTrainee = false,
    isHeader,
    onSearchClick,
    onEditClick,
    onAssignMeClick
  } = props;

  return (
    <div className={isHeader ? "headerRow" : "item"}>
      <table>
        <tbody>
          <tr>
            <td>{abteilung}</td>
            <td>{job}</td>
            <td>{date}</td>
            <td>{version}</td>
            <td>
              {isHeader ? (
                <div />
              ) : isTrainee ? (
                <div>
                  <Tooltip title={"Detailansicht"} onClick={onSearchClick}>
                    <IconButton>
                      <SearchIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={"Mir zuweisen"} onClick={onAssignMeClick}>
                    <IconButton>
                      <Favorite fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </div>
              ) : (
                <div>
                  <Tooltip title={"Detailansicht"} onClick={onSearchClick}>
                    <IconButton>
                      <SearchIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={"Freigeben"}>
                    <IconButton>
                      <ShareIcon fontSize="small" />
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
