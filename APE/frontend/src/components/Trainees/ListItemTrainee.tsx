import * as React from "react";
import "./ListItemTrainee.css";

interface Props {
  name: string;
  username: string;
  firstname: string;
  education: string;
  isHeader?: boolean;
}

export const ListItemTrainee = (props: Props) => {
  const { username, name, firstname, education, isHeader = false } = props;

  return (
    <div className={isHeader ? "trainee-headerRow" : "trainee-item"}>
      <table>
        <tbody>
          <tr>
            <td>{username}</td>
            <td>{name}</td>
            <td>{firstname}</td>
            <td>{education}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
