import * as React from "react";
//import "../Login/LoginComponent.css";
import "./DevelopmentForms.css";
import { ListItem } from "./ListItem";
import { User } from "../../types/user-types";

/*interface Props {
    //developmentSheets: developmentSheets[];
    users: User[];
}*/

export const DevelopmentForms = () => {
  //const { developmentSheets } = props;
  const user: User[] = [
    {
      firstname: "Steven",
      lastname: "Hallo",
      role: "admin",
      token: "jdjdhf",
      username: "username"
    },
    {
      firstname: "Franz",
      lastname: "Müller",
      role: "trainee",
      token: "jdjdhf",
      username: "username_franz"
    }
  ];

  return (
    <div className={"frame center"}>
      <ListItem
        isHeader={true}
        abteilung="Abteilung"
        job="Ausbildungsberuf"
        date="Erstellungsdatum"
        version="Version"
      />
      {user.map(user => {
        return (
          <ListItem
            abteilung={user.lastname}
            job={user.role}
            date={user.token}
            version={user.username}
          />
        );
      })}
    </div>
  );
};
