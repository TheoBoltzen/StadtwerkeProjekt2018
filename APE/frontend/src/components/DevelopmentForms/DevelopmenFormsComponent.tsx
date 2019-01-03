import * as React from "react";
import "./DevelopmentForms.css";
import Button from "@material-ui/core/es/Button/Button";
import { ListItem } from "./ListItem";
import { AllProps, State } from "./DevelopmentForms";
import { CircularProgress } from "@material-ui/core";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import { DevelopmentStepper } from "./DevelopmentStepper";
import Typography from "@material-ui/core/es/Typography/Typography";
import "./DevelopmentFormsComponent.css";
import { DetailViewDevelopmentSheet } from "../DetailviewDevelopmentSheet/DetailViewDevelopmentSheet";

export class DevelopmentFormsComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      visibilityIndex: 0,
      developmenFormId: ""
    };
  }

  handleSearchClick = (event: any, id) => {
    this.props.getDevSheetDetails(id);
    this.setState({ visibilityIndex: 1 });
    this.setState({
      developmenFormId: id
    });
  };

  componentDidMount() {
    this.props.getAllDevForms();
  }

  componentDidUpdate(nextProps: AllProps, nextState: State) {
    if (this.state.visibilityIndex !== nextState.visibilityIndex) {
      this.props.getAllDevForms();
    }
  }

  changeVisibilityIndex = (event: any, value) => {
    this.setState({ visibilityIndex: value });
  };

  doFormatDate = date => {
    //date format from db: 	2018-12-03T12:12:26.000Z
    return new Date(date).toLocaleDateString("de");
  };

  onEditClick = (event: any, index) => {
    console.log("EditClick ", index);
  };

  getContent = visibilityIndex => {
    const { developmentForms, loading } = this.props;
    const { developmenFormId } = this.state;

    //console.log("---------devSheet:", this.props.detailDevForm);

    switch (visibilityIndex) {
      case 0:
        // Übersicht Bögen
        return (
          <div>
            {!loading ? (
              <div>
                <div className={"buttonDiv"}>
                  <div />
                  <Button
                    variant={"contained"}
                    color={"primary"}
                    className={"entwicklungsBogenButton"}
                    onClick={e => {
                      this.changeVisibilityIndex(e, 2);
                    }}>
                    Entwicklungsbogen erstellen
                  </Button>
                </div>
                <div className={"frameCenter"}>
                  <ListItem
                    isHeader={true}
                    abteilung="Abteilung"
                    job="Ausbildungsberuf"
                    date="Erstellungsdatum"
                  />
                  {developmentForms.map((devForm, index) => {
                    return (
                      <div key={index}>
                        <ListItem
                          abteilung={devForm.department}
                          job={devForm.education}
                          date={this.doFormatDate(devForm.createdAt)}
                          onEditClick={e => {
                            this.onEditClick(e, devForm.id);
                          }}
                          onSearchClick={e => {
                            this.handleSearchClick(e, devForm.id);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <CircularProgress className={"loading-spinner"} />
            )}
          </div>
        );
      case 1:
        // Detailansicht
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
                      this.changeVisibilityIndex(e, 0);
                    }}>
                    <ClearIcon />
                  </IconButton>
                </div>
                <DetailViewDevelopmentSheet
                  id={developmenFormId}
                  devSheetDetail={this.props.detailDevForm}
                  loading={this.props.loadingDetail}
                />
              </div>
            ) : (
              <CircularProgress className={"loading-spinner"} />
            )}
          </div>
        );
      case 2:
        // Entwicklungsbogen Erstellung
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
                      this.changeVisibilityIndex(e, 0);
                    }}>
                    <ClearIcon />
                  </IconButton>
                </div>

                <DevelopmentStepper
                  close={e => {
                    this.changeVisibilityIndex(e, 0);
                  }}
                />
              </div>
            ) : (
              <CircularProgress className={"loading-spinner"} />
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
    return <div className={"root"}>{this.getContent(this.state.visibilityIndex)}</div>;
  }
}
