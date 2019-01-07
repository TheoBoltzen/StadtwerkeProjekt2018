import * as React from "react";
import "../DevelopmentForms/DevelopmentForms.css";
import Button from "@material-ui/core/es/Button/Button";
import { ListItem } from "../DevelopmentForms/ListItem";
import { ListItemTraineeDevs } from "./ListItemTraineeDevs";
import { AllProps, State } from "./TraineeView";
import { CircularProgress } from "@material-ui/core";
//import { DetailviewDevelopmentSheetComponent } from "../DetailviewDevelopmentSheet/DetailviewDevelopmentSheetComponent";
import { FillOutDevelopmentSheet } from "../FillOutDevelopmentSheet/FillOutDevelopmentSheet";
import Typography from "@material-ui/core/es/Typography/Typography"; //später

export class TraineeViewComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      visibility_index: "All_Trainee_DevSheets"
    };
  }

  handleSearchClickTraineeDevSheet = () => {
    this.setState({
      visibility_index: "Display_one_Trainee_DevSheet"
    });
  };

  setAssignmentDevSheet = id => {
    this.props.setAssignment(id);
  };

  componentDidMount() {
    this.props.getAllDevForms();
    this.props.getDevFormsListTrainee(this.props.user.username);
  }

  changeVisibilityIndex = (e, index) => {
    this.setState({ visibility_index: index });
  };

  doFormatDate = date => {
    //date format from db: 	2018-12-03T12:12:26.000Z
    return new Date(date).toLocaleDateString("de");
  };

  handleFillOutClick = (e, devSheetId, trainerUsername) => {
    this.props.getFullDevSheet(devSheetId, trainerUsername);
    this.changeVisibilityIndex(e, "Fillout_DevSheet");
  };

  getContent = visibilityIndex => {
    const {
      developmentForms,
      loading,
      loadingTraineeDevSheets,
      traineeDevelopmentFormsList
    } = this.props;

    switch (visibilityIndex) {
      case "All_Trainee_DevSheets":
        // Übersicht alle zugewiesene Bögen eines Azubis
        return (
          <div>
            {!loadingTraineeDevSheets ? (
              <div className={"switchRoot"}>
                <div className={"flexDiv"}>
                  <Button
                    variant={"contained"}
                    color={"primary"}
                    className={"entwicklungsBogenButton"}
                    onClick={e => {
                      this.changeVisibilityIndex(e, "All_DevSheets");
                    }}>
                    Finde Entwicklungsbögen
                  </Button>
                </div>
                <div className={"frame center"}>
                  <ListItemTraineeDevs
                    isHeader={true}
                    department="Abteilung"
                    education="Ausbildungsberuf"
                    updatedAt="Änderungsdatum"
                    status="Status"
                    trainerUsername="Ausbilder"
                  />
                  {traineeDevelopmentFormsList.map((devForm, index) => {
                    return (
                      <ListItemTraineeDevs
                        key={index}
                        //is displayed
                        department={devForm.DevelopmentSheet.department}
                        education={devForm.DevelopmentSheet.education}
                        updatedAt={this.doFormatDate(devForm.updatedAt)}
                        status={devForm.status}
                        trainerUsername={devForm.TrainerUsername}
                        //TO DO
                        onSearchClick={this.handleSearchClickTraineeDevSheet}
                        onEditClick={e => {
                          this.handleFillOutClick(e, devForm.id, devForm.TrainerUsername);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <CircularProgress className={"loading-spinner"} />
              </div>
            )}
          </div>
        );
      case "All_DevSheets":
        // Alle Bögen in Liste anzeigen
        return (
          <div className={"switchRoot"}>
            {!loading ? (
              <div>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  className={"entwicklungsBogenButton"}
                  onClick={e => {
                    this.changeVisibilityIndex(e, "All_Trainee_DevSheets");
                  }}>
                  Zurück
                </Button>
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
                        onSearchClick={e => {
                          this.changeVisibilityIndex(e, "Display_one_Detail_DevSheet");
                        }}
                        onAssignMeClick={() => this.setAssignmentDevSheet(devForm.id)}
                        isTrainee={true}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <CircularProgress />
              </div>
            )}
          </div>
        );
      case "Fillout_DevSheet":
        // Entwicklungsbogen ausfüllen
        return (
          <div>
            {!loading ? (
              <div>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  className={"entwicklungsBogenButton"}
                  onClick={e => {
                    this.changeVisibilityIndex(e, "All_Trainee_DevSheets");
                  }}>
                  Zurück
                </Button>
                <FillOutDevelopmentSheet
                  fullDevSheet={this.props.fullDevSheet}
                  loading={this.props.loadingFullDevSheet}
                />
              </div>
            ) : (
              <div>
                <CircularProgress className={"loading-spinner"} />
              </div>
            )}
          </div>
        );
      case "Display_one_Detail_DevSheet":
        // einen bestimmten Bogen aus allen existierenden Entwicklungsbögen
        return (
          <div>
            {!loading ? (
              <div>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  className={"entwicklungsBogenButton"}
                  onClick={e => {
                    this.changeVisibilityIndex(e, "All_Trainee_DevSheets");
                  }}>
                  Zurück
                </Button>
                {/*<DetailviewDevelopmentSheetComponent />*/}
              </div>
            ) : (
              <div>
                <CircularProgress className={"loading-spinner"} />
              </div>
            )}
          </div>
        );
      case "Display_one_Trainee_DevSheet":
        // einen bestimmten Bogen aus allen existierenden Entwicklungsbögen
        return (
          <div>
            {!loading ? (
              <div>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  className={"entwicklungsBogenButton"}
                  onClick={e => {
                    this.changeVisibilityIndex(e, "All_Trainee_DevSheets");
                  }}>
                  Zurück
                </Button>
                Detail Trainee Devsheet
              </div>
            ) : (
              <div>
                <CircularProgress className={"loading-spinner"} />
              </div>
            )}
          </div>
        );
      default:
        return (
          <div>
            <Typography variant={"h2"}>Upps hier lief was schief</Typography>
          </div>
        );
    }
  };

  render() {
    return <div className={"root"}>{this.getContent(this.state.visibility_index)}</div>;
  }
}
