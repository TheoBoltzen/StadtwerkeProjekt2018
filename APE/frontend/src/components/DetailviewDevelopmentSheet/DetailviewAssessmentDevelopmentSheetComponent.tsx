import * as React from "react";
import { Graph } from "./graph";
import LabelWithTextfield from "./LabelWithTextfield";
import "./DetailviewDevelopmentSheetComponent.css";
import { AllProps } from "./DetailViewAssessmentDevelopmentSheet";
import { CircularProgress } from "@material-ui/core";

export const DetailviewAssessmentDevelopmentSheetComponent = (props: AllProps) => {
  const { loading } = props;

  const mapIntegerToString = intValue => {
    var result = "";
    switch (intValue) {
      case 1:
        result = "in vollem Maße";
        break;
      case 2:
        result = "weitgehend";
        break;
      case 3:
        result = "teilweise";
        break;
      case 4:
        result = "unzureichend";
        break;
      case 5:
        result = "nicht";
        break;
      default:
        result = "";
    }
    return result;
  };

  let kriteria: string[] = [];
  let sollWerte: string[] = [];
  let istWerte_trainee: string[] = [];
  let istWerte_trainer: string[] = [];

  const clearArrays = () => {
    kriteria = [];
    sollWerte = [];
    istWerte_trainee = [];
    istWerte_trainer = [];
  };

  return loading ? (
    <CircularProgress />
  ) : (
    <div className={"detailRoot"}>
      <div>
        <h2>Entwicklungsbogen für Auszubildende der Stadtwerke Kiel</h2>
      </div>
      <div className="div-header">
        <div className="div-left">
          <LabelWithTextfield
            name={"Abteilung"}
            content={props.fullDevSheetDetail.result.department}
          />
          <LabelWithTextfield name={"Ausbildungsbeauftragter"} content={""} />
          <LabelWithTextfield name={"Auszubildener"} content={""} />
        </div>
        <div className="div-right">
          <LabelWithTextfield
            name={"Ausbildungsberuf"}
            content={props.fullDevSheetDetail.result.education}
          />
          <LabelWithTextfield name={"Einstellungsdatum"} content={""} />
          <LabelWithTextfield name={"Erstellungsdatum"} content={""} />
        </div>
      </div>

      <div>
        {props.fullDevSheetDetail.result.content &&
          props.fullDevSheetDetail.result.content.map((kompetenzen, index_1) => (
            <div className={"frameDetail"} key={index_1}>
              <h3 key={index_1}>{kompetenzen.name}</h3>
              {kompetenzen.children &&
                kompetenzen.children.map((hauptkategorie, index_2) => (
                  <div className="gravity-left" key={index_2}>
                    <h4 key={index_2}>{hauptkategorie.name}</h4>
                    {hauptkategorie.children &&
                      hauptkategorie.children.map((subkategorie, index_3) => (
                        <div className="gravity-left" key={index_3}>
                          <h5 key={index_3}>{subkategorie.name}</h5>
                          {subkategorie.children &&
                            subkategorie.children.map((kriterium, index_4) => {
                              kriteria.push(kriterium.name);
                              sollWerte.push(mapIntegerToString(kriterium.goalCross));
                              istWerte_trainee.push(
                                mapIntegerToString(kriterium.traineeassessment)
                              );
                              istWerte_trainer.push(
                                mapIntegerToString(kriterium.trainerassessment)
                              );
                            })}

                          <Graph
                            ist_werte_trainee={istWerte_trainee}
                            ist_werte_trainer={istWerte_trainer}
                            soll_werte={sollWerte}
                            kriterien={kriteria}
                            isOutfilledDevSheet={true}
                          />
                          {clearArrays()}
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};
