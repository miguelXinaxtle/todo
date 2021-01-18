import React from "react";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from "victory";
import { useSelector } from "react-redux";

const TodoChart = () => {
  // Subscripción para obtener la data
  const day = useSelector((state) => state.day);

  return (
    <VictoryChart
      height={400}
      width={400}
      theme={VictoryTheme.material}
      domainPadding={10}
    >
      <VictoryAxis
        tickValues={[0, 1, 2, 3, 4, 5, 6]}
        tickFormat={["D", "L", "M", "M", "J", "V", "S"]}
      />
      <VictoryAxis dependentAxis tickFormat={(x) => `${x}`} />
      <VictoryBar data={day.dayList} x="day" y="time" />
    </VictoryChart>
  );
};

export default TodoChart;
