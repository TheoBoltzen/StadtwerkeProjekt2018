import * as React from "react";
import "./UserAdministrationComponent.css";
import { Button, CircularProgress, Dialog } from "@material-ui/core";
import { ListItem } from "./ListItem";
import { AllProps, State } from "./UserAdministration";
import { AddUserModal } from "./AddUserModal";

export class UserAdministrationComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      isAddUserModalOpen: false
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  private openAddUserModal = () => {
    this.setState({
      isAddUserModalOpen: !this.state.isAddUserModalOpen
    });
  };

  render() {
    const { isAddUserModalOpen } = this.state;
    const { users, loading } = this.props;

    return loading ? (
      <CircularProgress />
    ) : (
      <div className={"root-user-administration"}>
        <Dialog open={isAddUserModalOpen} onClose={this.openAddUserModal}>
          <AddUserModal closeDialog={this.openAddUserModal} />
        </Dialog>

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
