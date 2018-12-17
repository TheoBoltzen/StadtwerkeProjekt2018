import * as React from "react";
import "./DevelopmentForms.css";
import Button from "@material-ui/core/es/Button/Button";
import { ListItem } from "./ListItem";
import { AllProps, State } from "./DevelopmentForms";
import { CircularProgress } from "@material-ui/core";
import { DetailviewDevelopmentSheetComponent } from "../DetailviewDevelopmentSheet/DetailviewDevelopmentSheetComponent";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import { DevelopmentStepper } from "./DevelopmentStepper";

export class DevelopmentFormsComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      visibilityIndex: false,
      isHidden: true
    };
  }

  handleChildClick() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  componentDidMount() {
    this.props.getAllDevForms();
  }

  componentDidUpdate(nextProps: AllProps, nextState: State) {
    if (this.state.visibilityIndex !== nextState.visibilityIndex) {
      this.props.getAllDevForms();
    }
  }

  changeVisibilityIndex = () => {
    this.setState({ visibilityIndex: !this.state.visibilityIndex });
  };

  doFormatDate = date => {
    //date format from db: 	2018-12-03T12:12:26.000Z
    return new Date(date).toLocaleDateString("de");
  };

  onEditClick = (event: any, index) => {
    console.log("EditClick ", index);
  };

  getContent = () => {
    const { developmentForms, loading } = this.props;
    const { isHidden } = this.state;

    //DetailviewDevelopmentSheetComponent muss beim Klick die die id des Entwicklungsbogens mitgegeben werden!
    return this.state.visibilityIndex ? (
      <div className={"switchRoot"}>
        <div className={"flexDiv"}>
          <div />
          <IconButton
            color={"primary"}
            className={"crossButton"}
            onClick={this.changeVisibilityIndex}>
            <ClearIcon />
          </IconButton>
        </div>
        <DevelopmentStepper close={this.changeVisibilityIndex} />
      </div>
    ) : (
      <div className={"switchRoot"}>
        <div className={"flexDiv"}>
          <div />
          {!loading && (
            <Button
              variant={"contained"}
              color={"primary"}
              className={"entwicklungsBogenButton"}
              onClick={this.changeVisibilityIndex}>
              Entwicklungsbogen erstellen
            </Button>
          )}
        </div>
        {loading ? (
          <CircularProgress className={"loading-spinner"} />
        ) : isHidden ? (
          <div className={"frame center"}>
            <ListItem
              isHeader={true}
              abteilung="Abteilung"
              job="Ausbildungsberuf"
              date="Erstellungsdatum"
            />
            {developmentForms.map((devForm, index) => {
              return (
                <ListItem
                  key={index}
                  abteilung={devForm.department}
                  job={devForm.education}
                  date={this.doFormatDate(devForm.createdAt)}
                  onSearchClick={this.handleChildClick.bind(this)}
                  onEditClick={e => {
                    this.onEditClick(e, devForm.id);
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div>
            <DetailviewDevelopmentSheetComponent onClick={this.handleChildClick.bind(this)} />
          </div>
        )}
      </div>
    );
  };

  render() {
    return <div className={"root"}>{this.getContent()}</div>;
  }
}
