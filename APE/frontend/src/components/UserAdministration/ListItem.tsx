import * as React from "react";
import "./ListItem.css";

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
          </tr>
        </tbody>
      </table>
    </div>
  );
};
