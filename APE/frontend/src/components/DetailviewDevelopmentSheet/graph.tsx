import * as React from "react";
import "./graph.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

/*
const data = [
    {name: 'Kritierium 1', Wert: "teilweise"},
    {name: 'Kritierium 2', Wert: "weitgehend"},
    {name: 'Kritierium 3', Wert: "teilweise"},
    {name: '', a: "in vollem Maße", b: "weitgehend", c:"teilweise", d:"unzureichend", e:"nicht"},
];
*/

//http://recharts.org/en-US/api/XAxis#minTickGap
export const Graph = () => {
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

  var werte = ["teilweise", "teilweise", "weitgehend", "unzureichend", "teilweise", "teilweise"];

  const SimpleLineChart = () => {
    //<Tooltip/>, <Text width={1000}/>
    return (
      <div id="div-graph-font">
        <LineChart
          layout="vertical"
          width={window.innerWidth}
          height={300}
          data={createData(kriterien, werte)}
          margin={{ top: 20, right: window.innerWidth / 3, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            datakey="x"
            ticks={["in vollem Maße", "weitgehend", "teilweise", "unzureichend", "nicht"]}
            type="category"
          />
          <YAxis dataKey="name" type="category" width={window.innerWidth / 3} />

          <Line
            dataKey="a"
            label={false}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            stroke="#FFFFFF"
            opacity="0"
          />
          <Line
            dataKey="b"
            label={false}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            stroke="#FFFFFF"
            opacity="0"
          />
          <Line
            dataKey="c"
            label={false}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            stroke="#FFFFFF"
            opacity="0"
          />
          <Line
            dataKey="d"
            label={false}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            stroke="#FFFFFF"
            opacity="0"
          />
          <Line
            dataKey="e"
            label={false}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            stroke="#FFFFFF"
            opacity="0"
          />
          <Line dataKey="wert" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  };

  function createData(kriterien, werte) {
    var data = [{}];
    for (var i = 0; i < kriterien.length; i++) {
      data.push({ name: kriterien[i], wert: werte[i] });
    }
    data.push({
      name: "",
      a: "in vollem Maße",
      b: "weitgehend",
      c: "teilweise",
      d: "unzureichend",
      e: "nicht"
    });
    return data;
  }

  return (
    <div>
      <SimpleLineChart />
    </div>
  );
};
