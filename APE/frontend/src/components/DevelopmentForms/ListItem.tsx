import * as React from "react";
import "./ListItem.css";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import ShareIcon from "@material-ui/icons/Share";
import { IconButton, Tooltip } from "@material-ui/core";

interface Props {
  abteilung: string;
  job: string;
  date: string;
  version: string;
  isHeader?: boolean;
  onClick?: any;
}

export const ListItem = (props: Props) => {
  const { abteilung, job, date, version, isHeader = false, onClick } = props;

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
              {!isHeader && (
                <div>
                  <Tooltip title={"Detailansicht"}>
                    <IconButton>
                      <SearchIcon fontSize="small" onClick={onClick} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={"Freigeben"}>
                    <IconButton>
                      <ShareIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Bearbeiten"}>
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
