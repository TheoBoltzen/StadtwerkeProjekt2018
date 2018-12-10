import * as React from "react";
import { Graph } from "./graph";
import { LabelWithTextfield } from "./LabelWithTextfield";
import "./DetailviewDevelopmentSheetComponent.css";
//import { List, ListItem } from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";

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
    //  "Kritrium X",
    //  "Kritrium Y",
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
        <h3>Soziale Kompetenzen</h3>
        <table>
          <tr>
            <td>
              <Graph ist_werte={ist_werte} soll_werte={soll_werte} kriterien={kriterien} />
            </td>
            <td>
              <Graph ist_werte={ist_werte} soll_werte={soll_werte} kriterien={kriterien} />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};
//<List>{array && array.map((i, index) => <ListItem key={index}>{i.y}</ListItem>)}</List>
