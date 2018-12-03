import * as React from "react";
import "./DevelopmentForms.css";
import { ListItem } from "./ListItem";
import { AllProps } from "./DevelopmentForms";
import { CircularProgress } from "@material-ui/core";

export class DevelopmentFormsComponent extends React.Component<AllProps, {}> {
  constructor(props: AllProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllDevForms();
  }

  doFormatDate = date => {
    //date format from db: 	2018-12-03T12:12:26.000Z
    return new Date(date).toLocaleDateString("de");
  };

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
              date={this.doFormatDate(devForm.createdAt)}
              version={devForm.version}
            />
          );
        })}
      </div>
    );
  }
}
