import * as React from "react";
import { Graph } from "./graph";
import LabelWithTextfield from "./LabelWithTextfield";
import "./DetailviewDevelopmentSheetComponent.css";
import { AllProps } from "./DetailViewDevelopmentSheet";
import { CircularProgress } from "@material-ui/core";
//import { List, ListItem } from "@material-ui/core";

//------------------

//------------------

export const DetailviewDevelopmentSheetComponent = (props: AllProps) => {
  console.log("props: ", props);

  const { loading } = props;

  const mapIntegerToString = intValue => {
    var result = "";
    switch (intValue) {
      case "1":
        result = "in vollem Maße";
        break;
      case "2":
        result = "weitgehend";
        break;
      case "3":
        result = "teilweise";
        break;
      case "4":
        result = "unzureichend";
        break;
      case "5":
        result = "nicht";
        break;
      default:
        result = "";
    }
    return result;
  };

  const jsonObj = {
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

  /*  var kriterien = [
        "freundliches und aufgeschlossenes Auftreten",
        "gepflegtes Erscheinungsbild",
        "geht auf Kundenwünsche ein",
        "zeigt sich kooperativ",
        "reagiert freundlich",
        "zeigt Hilfsbereitschaft"
      ];*/

  const ist_werte = ["teilweise", "teilweise", "teilweise", "teilweise", "teilweise", "teilweise"];
  /*  var soll_werte = [
        "weitgehend",
        "weitgehend",
        "weitgehend",
        "weitgehend",
        "weitgehend",
        "weitgehend"
      ];*/

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
        <h2>Entwicklungsbogen für Auszubildende der Stadtwerke Kiel</h2>
        <h4>Version {jsonObj.version}</h4>
      </div>
      <div className="div-header">
        <div className="div-left">
          <LabelWithTextfield name={"Abteilung"} content={jsonObj.department} />
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

      <div>
        {jsonObj.content &&
          jsonObj.content.map((kompetenzen, index_1) => (
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
                              return;
                            })}

                          <Graph
                            ist_werte={ist_werte}
                            soll_werte={sollWerte}
                            kriterien={kriteria}
                          />
                          {console.log(sollWerte)}
                          {console.log(kriteria)}
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
//<List>{array && array.map((i, index) => <ListItem key={index}>{i.y}</ListItem>)}</List>
