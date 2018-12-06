import * as React from "react";
import "./graph.css";
//import { LineChart } from "react-easy-chart";
//import { Chart, ArgumentAxis, ValueAxis, LineSeries, ValueGrid } from "@devexpress/dx-react-chart-material-ui";
//import { Scale } from "@devexpress/dx-react-chart";

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

  // var bewertung_x_axes = ["in vollem Maße", "weitgehend", "teilweise", "unzureichend", "nicht"];
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
    //console.log(data);
    return data;
  }

  return (
    <div>
      <SimpleLineChart />
    </div>
  );

  /*    function createData(bewertung_x_axes, tesdata, kriterien_y_axes) {
        var data = [{}];
        for (var i = 0; i < kriterien_y_axes.length; i++) {
            data.push({x_axes: bewertung_x_axes[i], x_value: testdata[i], y: kriterien_y_axes[i]});
        }
        console.log(data);
        return data;
    }

    return (
      <div>
          <Chart width={800} height={300}
              data = {createData(bewertung_x_axes, testdata, kriterien_y_axes)}
          >
              <ValueGrid />
              <ArgumentAxis/>
              <ValueAxis/>
              <LineSeries valueField="y" argumentField="x_value" />
              <LineSeries valueField="y" argumentField="x_axes" color="transparent" />
              <Scale/>
          </Chart>
      </div>
  );*/

  /*return (
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
            { x: "weitgehend", y: "gepflegtes Erscheinungsbild" },
            { x: "teilweise", y: "geht auf Kundenwünsche ein" },
            { x: "teilweise", y: "zeigt sich kooperativ" },
            { x: "weitgehend", y: "reagiert freundlich" },
            { x: "teilweise", y: "zeigt Hilfsbereitschaft" }
          ],
          [
            { x: "teilweise", y: "freundliches und aufgeschlossenes Auftreten" },
            { x: "teilweise", y: "gepflegtes Erscheinungsbild" },
            { x: "unzureichend", y: "geht auf Kundenwünsche ein" },
            { x: "teilweise", y: "zeigt sich kooperativ" },
            { x: "in vollem Maße", y: "reagiert freundlich" },
            { x: "teilweise", y: "zeigt Hilfsbereitschaft" }
          ]
        ]}
      />
    </div>
  );*/
};
