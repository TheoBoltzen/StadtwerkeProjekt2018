import * as React from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { AllProps, State } from "./FillOutDevelopmentSheet";
import "./FillOutDevelopmentSheetComponent.css";
import { LabelWithTextfield } from "../DetailviewDevelopmentSheet/LabelWithTextfield";

export class FillDevelopmentSheetComponent extends React.Component<AllProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: "3"
    };
  }

  private handleChange = event => {
    console.log("event: ", event.target.value);
    this.setState({
      radioValue: event.target.value
    });
  };

  render() {
    const { radioValue } = this.state;

    const TestObject = {
      department: "PPCa",
      education: "IKB",
      version: "1",
      content: [
        {
          name: "Soziale Kompetenz",
          children: [
            {
              name: "Konfliktlösungskompetenz",
              children: [
                {
                  name: "Konfliktfähigkeit",
                  children: [
                    {
                      name: "spricht Konflikte an",
                      goalCross: "3",
                      ynAnswer: "false"
                    },
                    {
                      name: "bleibt stets sachlich",
                      goalCross: "3",
                      ynAnswer: "false"
                    },
                    {
                      name: "respektiert andere Meinungen",
                      goalCross: "3",
                      ynAnswer: "false"
                    },
                    {
                      name: "nimmt Kritik an und setzt sich mit ihr konstruktiv auseinander",
                      goalCross: "3",
                      ynAnswer: "false"
                    }
                  ]
                },

                {
                  name: "Kooperationsfähigkeit",
                  children: [
                    {
                      name: "kann sich schnell in ein Team einfügen",
                      goalCross: "4",
                      ynAnswer: "false"
                    },
                    {
                      name: "bringt sich mit Lösungsideen in die Gruppe ein",
                      goalCross: "4",
                      ynAnswer: "false"
                    },
                    {
                      name: "hört seinem Gegenüber aktiv zu",
                      goalCross: "4",
                      ynAnswer: "false"
                    }
                  ]
                }
              ]
            },

            {
              name: "Kunden- und Serviceorientierung",
              children: [
                {
                  name: "Verhalten gegenüber Kunden und Mitarbeitern",
                  children: [
                    {
                      name: "freundliches und aufgeschlossenes Auftreten",
                      goalCross: "2",
                      ynAnswer: "false"
                    },
                    {
                      name: "gepflegtes Erscheinungsbild",
                      goalCross: "2",
                      ynAnswer: "false"
                    },
                    {
                      name: "geht auf Kundenwünsche ein",
                      goalCross: "1",
                      ynAnswer: "false"
                    },
                    {
                      name: "zeigt Hilfsbereitschaft",
                      goalCross: "1",
                      ynAnswer: "false"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "Neue Kompetenz NEU",
          children: [
            {
              name: "Neue Hauptkategorie 1",
              children: [
                {
                  name: "Neue Subkategorie 1",
                  children: [
                    {
                      name: "Neue Kompetenz 1",
                      goalCross: "1",
                      ynAnswer: "false"
                    },
                    {
                      name: "Neue Kompetenz 2",
                      goalCross: "3",
                      ynAnswer: "false"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    return (
      <React.Fragment>
        <div className="div-header" id="frame">
          <div className="div-left">
            <LabelWithTextfield name={"Abteilung"} content={TestObject.department} />
            <LabelWithTextfield name={"Ausbildungsbeauftragter"} content={""} />
            <LabelWithTextfield name={"Auszubildener"} content={""} />
            <LabelWithTextfield name={"Ausbildungsberuf"} content={""} />
          </div>
          <div className="div-right">
            <LabelWithTextfield name={"Datum"} content={""} />
            <LabelWithTextfield name={"Ausbildungszeitraum"} content={""} />
            <LabelWithTextfield name={"Ausbildungsjahr"} content={""} />
            <LabelWithTextfield name={"Abwesenheitstage"} content={""} />
          </div>
        </div>

        {TestObject.content.map((competence, index) => (
          <div key={index} id={"frame"}>
            <h3>{competence.name}</h3>
            {competence.children.map(mainCategory => (
              <div className={"gravity-left"}>
                <h4>{mainCategory.name}</h4>
                {mainCategory.children.map(subCategory => (
                  <div className={"gravity-left"}>
                    <h5>{subCategory.name}</h5>
                    {subCategory.children.map(criteria => (
                      <div className={"criteria-container"}>
                        <legend className={"criteria-text"}>{criteria.name}</legend>
                        <FormControl component={"fieldset"}>
                          <RadioGroup
                            name={criteria.name}
                            onChange={this.handleChange}
                            value={radioValue}
                            row={true}>
                            <FormControlLabel
                              value={"1"}
                              control={<Radio color={"primary"} />}
                              label={""}
                            />
                            <FormControlLabel
                              value={"2"}
                              control={<Radio color={"primary"} />}
                              label={""}
                            />
                            <FormControlLabel
                              value={"3"}
                              control={<Radio color={"primary"} />}
                              label={""}
                            />
                            <FormControlLabel
                              value={"4"}
                              control={<Radio color={"primary"} />}
                              label={""}
                            />
                            <FormControlLabel
                              value={"5"}
                              control={<Radio color={"primary"} />}
                              label={""}
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}

        <div id={"frame"}>
          <h3>Soziale Kompetenz</h3>
          <h4>Hauptkategorie</h4>
          <h5>Unterkategorie</h5>

          <div className={"criteria-container"}>
            <legend className={"criteria-text"}>Test</legend>
            <FormControl component={"fieldset"}>
              <RadioGroup name={"test"} onChange={this.handleChange} value={radioValue} row={true}>
                <FormControlLabel value={"1"} control={<Radio color={"primary"} />} label={""} />
                <FormControlLabel value={"2"} control={<Radio color={"primary"} />} label={""} />
                <FormControlLabel value={"3"} control={<Radio color={"primary"} />} label={""} />
                <FormControlLabel value={"4"} control={<Radio color={"primary"} />} label={""} />
                <FormControlLabel value={"5"} control={<Radio color={"primary"} />} label={""} />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
