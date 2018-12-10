import * as React from "react";
import { Graph } from "./graph";
import { LabelWithTextfield } from "./LabelWithTextfield";
import "./DetailviewDevelopmentSheetComponent.css";
//import { List, ListItem } from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";

//------------------

var jsonObj = {
  department: "PPCa",
  education: "IKB",
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
                  goalCross: "4",
                  ynAnswer: "false"
                },
                {
                  name: "bleibt stets sachlich",
                  goalCross: "4",
                  ynAnswer: "false"
                },
                {
                  name: "respektiert andere Meinungen",
                  goalCross: "4",
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

//------------------

interface Props {
  /*x: String;
    y: String;  */
  onClick?: any;
}

export const DetailviewDevelopmentSheetComponent = (props: Props) => {
  const { onClick } = props;

  var kriterien = [
    "freundliches und aufgeschlossenes Auftreten",
    "gepflegtes Erscheinungsbild",
    "geht auf Kundenwünsche ein",
    "zeigt sich kooperativ",
    "reagiert freundlich",
    "zeigt Hilfsbereitschaft"
  ];

  var ist_werte = [
    "teilweise",
    "teilweise",
    "weitgehend",
    "unzureichend",
    "teilweise",
    "teilweise"
  ];
  var soll_werte = [
    "weitgehend",
    "weitgehend",
    "weitgehend",
    "weitgehend",
    "weitgehend",
    "weitgehend"
  ];

  let kriteria: string[] = [];
  let sollWerte: string[] = [];

  return (
    <div>
      <Button onClick={onClick}>Zurück</Button>
      <div>
        <h2>Entwicklungsbogen für Auszubildende der Stadtwerke Kiel</h2>
      </div>
      <div className="div-header">
        <div className="div-left">
          <LabelWithTextfield name={"Abteilung"} content={"KFME"} />
          <LabelWithTextfield name={"Ausbildungsbeauftragter"} content={"Max Mustermann"} />
          <LabelWithTextfield name={"Auszubildener"} content={"Azu Bi"} />
          <LabelWithTextfield name={"Ausbildungsberuf"} content={"Elektroniker"} />
        </div>
        <div className="div-right">
          <LabelWithTextfield name={"Datum"} content={"10.12.2018"} />
          <LabelWithTextfield name={"Ausbildungszeitraum"} content={"06.2018 - 09.2018"} />
          <LabelWithTextfield name={"Ausbildungsjahr"} content={"2018"} />
          <LabelWithTextfield name={"Abwesenheitstage"} content={"4"} />
        </div>
      </div>

      <div>
        {jsonObj.content &&
          jsonObj.content.map((kompetenzen, index_1) => (
            <div>
              <h3 key={index_1}>{kompetenzen.name}</h3>
              {kompetenzen.children &&
                kompetenzen.children.map((hauptkategorie, index_2) => (
                  <div>
                    <h4 key={index_2}>{hauptkategorie.name}</h4>
                    {hauptkategorie.children &&
                      hauptkategorie.children.map((subkategorie, index_3) => (
                        <div>
                          <h5 key={index_3}>{subkategorie.name}</h5>
                          {subkategorie.children &&
                            subkategorie.children.map((kriterium, index_4) => {
                              kriteria.push(kriterium.name);
                              sollWerte.push(mapIntegerToString(kriterium.goalCross));
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

      <div>
        <h3>Soziale Kompetenzen</h3>
        <div>
          <Graph ist_werte={ist_werte} soll_werte={soll_werte} kriterien={kriterien} />
        </div>
      </div>
    </div>
  );

  function mapIntegerToString(intValue) {
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
  }

  function clearArrays() {
    kriteria = [];
    sollWerte = [];
  }
};
//<List>{array && array.map((i, index) => <ListItem key={index}>{i.y}</ListItem>)}</List>
