import * as React from "react";
import { Graph } from "./graph";
//import "./DetailviewDevelopmentSheetComponent.css";
import { List, ListItem } from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";

interface Props {
  /*x: String;
    y: String;  */
  onClick?: any;
}

export const DetailviewDevelopmentSheetComponent = (props: Props) => {
  const { onClick } = props;

  const array = [
    { x: 1, y: "freundliches Erscheinungsbild" },
    { x: 1, y: "gepflegtes Aussehen" },
    { x: 1, y: "geht auf Kundenwünsche ein" },
    { x: 1, y: "zeigt sicht kooperativ in der Zusammenarbeit" },
    { x: 1, y: "reagiert flexibel und schnell auf Anforderungen" },
    { x: 1, y: "zeigt Hilfsbereitschaft" }
  ];

  return (
    <div>
      <Button onClick={onClick}>Zurück</Button>
      <div>
        <h6>Kunden- und Serviceorientierung</h6>
      </div>
      <div>
        <div>
          <Graph />
          <List>{array && array.map((i, index) => <ListItem key={index}>{i.y}</ListItem>)}</List>
        </div>
      </div>
    </div>
  );
};
