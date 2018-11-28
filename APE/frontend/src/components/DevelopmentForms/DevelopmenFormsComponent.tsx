import * as React from "react";
import "./DevelopmentForms.css";
import { ListItem } from "./ListItem";
import { AllProps } from "./DevelopmentForms";
import { CircularProgress } from "@material-ui/core";

/*interface Props {
    //developmentSheets: developmentSheets[];
    users: User[];
}*/

export class DevelopmentFormsComponent extends React.Component<AllProps, {}> {
  constructor(props: AllProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllDevForms();
  }

  render() {
    const { developmentForms, loading } = this.props;

    return loading ? (
      <CircularProgress />
    ) : (
      <div className={"frame center"}>
        <ListItem
          isHeader={true}
          abteilung="Abteilung"
          job="Ausbildungsberuf"
          date="Erstellungsdatum"
          version="Version"
        />
        {developmentForms.map((devForm, index) => {
          return (
            <ListItem
              key={index}
              abteilung={devForm.department}
              job={devForm.education}
              date={devForm.createdAt}
              version={devForm.version}
            />
          );
        })}
      </div>
    );
  }
}
