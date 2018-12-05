//https://devexpress.github.io/devextreme-reactive/react/chart/docs/guides/getting-started/
import * as React from "react";
import { LineChart } from "react-easy-chart";

export const Graph = () => {
  var kriterien = [
    "freundliches und aufgeschlossenes Auftreten",
    "gepflegtes Erscheinungsbild",
    "geht auf Kundenwünsche ein",
    "zeigt sich kooperativ",
    "reagiert freundlich",
    "zeigt Hilfsbereitschaft"
  ];

  var bewertung = ["in vollem Maße", "weitgehend", "teilweise", "unzureichend", "nicht"];

  return (
    <div>
      <LineChart
        yType={"text"}
        xType={"text"}
        axes
        dataPoints
        grid
        margin={{ top: 10, right: 10, bottom: 50, left: 200 }}
        yDomainRange={kriterien}
        xDomainRange={bewertung}
        axisLabels={{ x: "Kriterien", y: "Skala" }}
        width={500}
        height={50 * kriterien.length}
        data={[
          [
            { x: "teilweise", y: "freundliches und aufgeschlossenes Auftreten" },
            { x: "teilweise", y: "gepflegtes Erscheinungsbild" },
            { x: "teilweise", y: "geht auf Kundenwünsche ein" },
            { x: "teilweise", y: "zeigt sich kooperativ" },
            { x: "teilweise", y: "reagiert freundlich" },
            { x: "teilweise", y: "zeigt Hilfsbereitschaft" }
          ]
        ]}
      />
    </div>
  );
};
