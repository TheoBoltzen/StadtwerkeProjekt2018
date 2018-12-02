import * as React from "react";
import "./ListItem.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, Tooltip } from "@material-ui/core";

interface Props {
  name: string;
  username: string;
  firstname: string;
  job: string;
  isHeader?: boolean;
}

export const ListItem = (props: Props) => {
  const { username, name, firstname, job, isHeader = false } = props;

  return (
    <div className={isHeader ? "headerRow" : "item"}>
      <table>
        <tbody>
          <tr>
            <td>{username}</td>
            <td>{name}</td>
            <td>{firstname}</td>
            <td>{job}</td>
            <td>
              {!isHeader && (
                <div>
                  <Tooltip title={"Bearbeiten"}>
                    <IconButton>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Löschen"}>
                    <IconButton>
                      <DeleteIcon fontSize="small" />
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
