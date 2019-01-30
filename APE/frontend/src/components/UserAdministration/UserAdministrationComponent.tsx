import * as React from "react";
import "./UserAdministrationComponent.css";
import { CircularProgress, Dialog } from "@material-ui/core";
import { ListItem } from "./ListItem";
import { AllProps, State } from "./UserAdministration";
import { AddUserModal } from "./AddUserModal";
import CustomizedButton from "../General/CustomizedButton";

export class UserAdministrationComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    //Set initial state
    this.state = {
      isAddUserModalOpen: false
    };
  }

  componentDidMount() {
    //Fetch all users when component renders
    this.props.getAllUsers();
  }

  componentDidUpdate(nextProps: AllProps, nextState: State) {
    //Fetch users again when dialog was closed
    if (
      nextState.isAddUserModalOpen &&
      nextState.isAddUserModalOpen !== this.state.isAddUserModalOpen
    ) {
      this.props.getAllUsers();
    }
  }

  //Opens Dialog
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
          <CustomizedButton onClick={this.openAddUserModal} text={"Benutzer anlegen"} />
        </div>

        <div className={"frame center"}>
          <ListItem
            isHeader={true}
            username={"Kennung"}
            name={"Name"}
            firstname={"Vorname"}
            job={"Tätigkeit"}
            role={"Rolle"}
          />
          {users.map((user, index) => {
            return (
              <ListItem
                key={index}
                username={user.username}
                name={user.lastname}
                firstname={user.firstname}
                job={user.job}
                role={user.role}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
