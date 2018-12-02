import * as React from "react";
import { CircularProgress } from "@material-ui/core";
import { ListItem } from "./ListItem";
import { AllProps } from "./UserAdministration";

export class UserAdministrationComponent extends React.Component<AllProps, {}> {
  constructor(props: AllProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const { users, loading } = this.props;

    return loading ? (
      <CircularProgress />
    ) : (
      <div className={"frame center"}>
        <ListItem isHeader={true} name={"Name"} firstname={"Vorname"} job={"Tätigkeit"} />
        {users.map((user, index) => {
          return (
            <ListItem key={index} name={user.lastname} firstname={user.firstname} job={user.job} />
          );
        })}
      </div>
    );
  }
}
