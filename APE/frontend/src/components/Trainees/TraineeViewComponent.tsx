import * as React from "react";
import "../DevelopmentForms/DevelopmentForms.css";
import { ListItem } from "../DevelopmentForms/ListItem";
import { ListItemTraineeDevs } from "./ListItemTraineeDevs";
import { AllProps, State } from "./TraineeView";
import { CircularProgress } from "@material-ui/core";
import { FillOutDevelopmentSheet } from "../FillOutDevelopmentSheet/FillOutDevelopmentSheet";
import Typography from "@material-ui/core/Typography/Typography";
import { DetailViewDevelopmentSheet } from "../DetailviewDevelopmentSheet/DetailViewDevelopmentSheet";
import CustomizedButton from "../General/CustomizedButton";
import { DetailviewAssessmentDevelopmentSheetComponent } from "../DetailviewDevelopmentSheet/DetailviewAssessmentDevelopmentSheetComponent";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ClearIcon from "@material-ui/icons/Clear";

export class TraineeViewComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      visibility_index: "All_Trainee_DevSheets",
      developmentFormId: ""
    };
  }

  setAssignmentDevSheet = async id => {
    await this.props.setAssignment(id);
    this.changeVisibilityIndex("", "All_Trainee_DevSheets");
  };

  componentDidMount() {
    this.props.getAllDevForms();
    this.props.getDevFormsListTrainee();
  }

  changeVisibilityIndex = (e, index) => {
    this.props.getAllDevForms();
    this.props.getDevFormsListTrainee();
    this.setState({ visibility_index: index });
  };

  getDetailView = (e, index, id) => {
    this.props.getDevSheetDetails(id);
    this.changeVisibilityIndex(e, index);
    this.setState({
      developmentFormId: id
    });
  };

  doFormatDate = date => {
    //date format from db: 	2018-12-03T12:12:26.000Z
    return new Date(date).toLocaleDateString("de");
  };

  handleFillOutClick = (e, devSheetId, trainerUsername) => {
    this.props.getFullDevSheet(devSheetId, trainerUsername);
    this.changeVisibilityIndex(e, "Fillout_DevSheet");
  };

  handleSearchClickTraineeDevSheet = (e, devSheetId, trainerUsername) => {
    this.props.getFullDevSheet(devSheetId, trainerUsername);
    this.changeVisibilityIndex(e, "Display_one_Trainee_DevSheet");
    this.setState({
      developmentFormId: devSheetId
    });
  };

  getContent = visibilityIndex => {
    const {
      developmentForms,
      loading,
      loadingTraineeDevSheets,
      traineeDevelopmentFormsList
    } = this.props;
    const { developmentFormId } = this.state;

    switch (visibilityIndex) {
      case "All_Trainee_DevSheets":
        // Übersicht alle zugewiesene Bögen eines Azubis
        return (
          <div>
            {!loadingTraineeDevSheets ? (
              <div className={"switchRoot"}>
                <div className={"buttonDiv"}>
                  <div />
                  <CustomizedButton
                    onClick={e => {
                      this.changeVisibilityIndex(e, "All_DevSheets");
                    }}
                    text={"Finde Entwicklungsbögen"}
                  />
                </div>
                <div className={"frame center"}>
                  <ListItemTraineeDevs
                    isHeader={true}
                    department="Abteilung"
                    education="Ausbildungsberuf"
                    createdAt="Erstellungsdatum"
                    status="Status"
                    trainerUsername="Ausbilder"
                  />
                  {traineeDevelopmentFormsList.map((devForm, index) => {
                    return (
                      <ListItemTraineeDevs
                        key={index}
                        department={devForm.DevelopmentSheet.department}
                        education={devForm.DevelopmentSheet.education}
                        createdAt={this.doFormatDate(devForm.createdAt)}
                        status={devForm.status}
                        trainerUsername={devForm.TrainerUsername}
                        onSearchClick={e => {
                          this.handleSearchClickTraineeDevSheet(
                            e,
                            devForm.DevelopmentSheetId,
                            devForm.TrainerUsername
                          );
                        }}
                        onEditClick={e => {
                          this.handleFillOutClick(
                            e,
                            devForm.DevelopmentSheetId,
                            devForm.TrainerUsername
                          );
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
                <div className={"buttonDiv"}>
                  <div />
                  <CustomizedButton
                    onClick={e => {
                      this.changeVisibilityIndex(e, "All_Trainee_DevSheets");
                    }}
                    text={"Zurück"}
                  />
                </div>
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
                          this.getDetailView(e, "Display_one_Detail_DevSheet", devForm.id);
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
                <div className={"buttonDiv"}>
                  <div />
                  <IconButton
                    color={"primary"}
                    className={"crossButton"}
                    onClick={e => {
                      this.changeVisibilityIndex(e, "All_Trainee_DevSheets");
                    }}>
                    <ClearIcon />
                  </IconButton>
                </div>
                <FillOutDevelopmentSheet
                  fullDevSheet={this.props.fullDevSheet}
                  loading={this.props.loadingFullDevSheet}
                  goBack={() => this.changeVisibilityIndex("", "All_Trainee_DevSheets")}
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
                <div className={"buttonDiv"}>
                  <div />
                  <IconButton
                    color={"primary"}
                    className={"crossButton"}
                    onClick={e => {
                      this.changeVisibilityIndex(e, "All_DevSheets");
                    }}>
                    <ClearIcon />
                  </IconButton>
                </div>
                <DetailViewDevelopmentSheet
                  id={developmentFormId}
                  devSheetDetail={this.props.detailDevForm}
                  loading={this.props.loadingDetail}
                />
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
                <div className={"buttonDiv"}>
                  <div />
                  <IconButton
                    color={"primary"}
                    className={"crossButton"}
                    onClick={e => {
                      this.changeVisibilityIndex(e, "All_Trainee_DevSheets");
                    }}>
                    <ClearIcon />
                  </IconButton>
                </div>
                <DetailviewAssessmentDevelopmentSheetComponent
                  id={developmentFormId}
                  fullDevSheetDetail={this.props.fullDevSheet}
                  loading={this.props.loadingDetail}
                />
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
    console.log("PROPS: ", this.props);
    return <div className={"root"}>{this.getContent(this.state.visibility_index)}</div>;
  }
}
