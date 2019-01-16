import * as React from "react";
import { Graph } from "./graph";
import LabelWithTextfield from "./LabelWithTextfield";
import "./DetailviewDevelopmentSheetComponent.css";
import { AllProps } from "./DetailViewDevelopmentSheet";
import { CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export const DetailviewDevelopmentSheetComponent = (props: AllProps) => {
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

  const clearArrays = () => {
    kriteria = [];
    sollWerte = [];
  };

  return loading ? (
    <CircularProgress />
  ) : (
    <div className={"detailRoot"}>
      <div>
        <Typography variant={"h4"}>
          Entwicklungsbogen für Auszubildende der Stadtwerke Kiel
        </Typography>
      </div>
      <div className="div-header">
        <div className="div-left">
          <LabelWithTextfield name={"Ausbildungsbeauftragter"} content={""} disabled={true} />
          <LabelWithTextfield name={"Auszubildener"} content={""} disabled={true} />
        </div>
        <div className="div-right">
          <LabelWithTextfield name={"Abteilung"} content={props.devSheetDetail.result.department} />

          <LabelWithTextfield
            name={"Ausbildungsberuf"}
            content={props.devSheetDetail.result.education}
          />
        </div>
      </div>

      <div>
        {props.devSheetDetail.result.content &&
          props.devSheetDetail.result.content.map((kompetenzen, index_1) => (
            <div className={"frameDetail"} key={index_1}>
              <h3 key={index_1}>{kompetenzen.name}</h3>
              {kompetenzen.children &&
                kompetenzen.children.map((hauptkategorie, index_2) => (
                  <div className="gravity-left" key={index_2}>
                    <h4 key={index_2}>{hauptkategorie.name}</h4>
                    {hauptkategorie.children &&
                      hauptkategorie.children.map((subkategorie, index_3) => (
                        <div className="gravity-left" id={"border"} key={index_3}>
                          <h5 key={index_3}>{subkategorie.name}</h5>
                          {subkategorie.children &&
                            subkategorie.children.map((kriterium, index_4) => {
                              kriteria.push(kriterium.name);
                              sollWerte.push(mapIntegerToString(kriterium.goalCross));
                            })}

                          <Graph
                            soll_werte={sollWerte}
                            kriterien={kriteria}
                            isOutfilledDevSheet={false}
                          />
                          {console.log("Sollwerte: ", sollWerte)}
                          {console.log("Kriterien: ", kriteria)}
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
