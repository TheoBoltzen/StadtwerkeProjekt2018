import * as React from "react";
import "./graph.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

/*
const data = [
    {name: 'Kritierium 1', Wert: "teilweise"},
    {name: 'Kritierium 2', Wert: "weitgehend"},
    {name: 'Kritierium 3', Wert: "teilweise"},
    {name: '', a: "in vollem Maße", b: "weitgehend", c:"teilweise", d:"unzureichend", e:"nicht"},
];
*/

//http://recharts.org/en-US/api/XAxis#minTickGap
interface Props {
  ist_werte: string[];
  soll_werte: string[];
  kriterien: string[];
}

export const Graph = (props: Props) => {
  const { ist_werte, soll_werte, kriterien } = props;

  const SimpleLineChart = () => {
    //<Tooltip/>, <Text width={1000}/>  window.innerWidth
    //          margin={{ top: 20, right: window.innerWidth / 3, left: 10, bottom: 5 }}>
    //margin={{ right: window.innerWidth / 3}}
    //                payload={[{ value: 'Istwerte', type: 'line', id: 'ID01' }, { value: 'Sollwerte', type: 'line', id: 'ID01' }]}
    var x_width = window.innerWidth / 2;
    return (
      <div id="div-graph-font">
        <LineChart
          layout="vertical"
          width={x_width}
          height={300}
          data={createData(kriterien, ist_werte, soll_werte)}>
          <Legend verticalAlign="top" height={36} />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            datakey="x"
            ticks={["in vollem Maße", "weitgehend", "teilweise", "unzureichend", "nicht"]}
            type="category"
          />
          <YAxis dataKey="name" type="category" width={x_width / 3} />

          <Line
            dataKey="a"
            label={false}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            stroke="#FFFFFF"
            opacity="1"
            legendType="none"
          />
          <Line
            dataKey="b"
            label={false}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            stroke="#FFFFFF"
            opacity="0"
            legendType="none"
          />
          <Line
            dataKey="c"
            label={false}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            stroke="#FFFFFF"
            opacity="0"
            legendType="none"
          />
          <Line
            dataKey="d"
            label={false}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            stroke="#FFFFFF"
            opacity="0"
            legendType="none"
          />
          <Line
            dataKey="e"
            label={false}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            stroke="#FFFFFF"
            opacity="0"
            legendType="none"
          />
          {/*<Line dataKey="Ist" stroke="orange" strokeWidth={5} dot={{ strokeWidth: 5, r: 4 }} />*/}
          <Line dataKey="Soll" stroke="#8884d8" strokeWidth={2} dot={{ strokeWidth: 2, r: 4 }} />
        </LineChart>
      </div>
    );
  };

  function createData(kriterien, ist_werte, soll_werte) {
    var data = [{}];
    for (var i = 0; i < kriterien.length; i++) {
      data.push({ name: kriterien[i], Ist: ist_werte[i], Soll: soll_werte[i] });
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
