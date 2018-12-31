import * as React from "react";
import "./UserAdministrationComponent.css";
import { Button, CircularProgress } from "@material-ui/core";
import { ListItem } from "./ListItem";
import { AllProps } from "./UserAdministration";

export class UserAdministrationComponent extends React.Component<AllProps, {}> {
  constructor(props: AllProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  private openAddUserModal = () => {
    console.log("test");
  };

  render() {
    const { users, loading } = this.props;

    return loading ? (
      <CircularProgress />
    ) : (
      <div className={"root-user-administration"}>
        <div className={"add-user-button-container"}>
          <div />
          <Button
            variant={"contained"}
            color={"primary"}
            className={"add-user-button"}
            onClick={this.openAddUserModal}>
            Benutzer anlegen
          </Button>
        </div>

        <div className={"frame center"}>
          <ListItem
            isHeader={true}
            username={"Kennung"}
            name={"Name"}
            firstname={"Vorname"}
            job={"Tätigkeit"}
          />
          {users.map((user, index) => {
            return (
              <ListItem
                key={index}
                username={user.username}
                name={user.lastname}
                firstname={user.firstname}
                job={user.job}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
