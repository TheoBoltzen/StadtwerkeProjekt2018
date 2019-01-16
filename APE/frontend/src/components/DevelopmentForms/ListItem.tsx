import * as React from "react";
import "./ListItem.css";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton, Tooltip } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";

interface Props {
  abteilung: string;
  job: string;
  date: string;
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
    isTrainee = false,
    isHeader,
    onSearchClick,
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
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
