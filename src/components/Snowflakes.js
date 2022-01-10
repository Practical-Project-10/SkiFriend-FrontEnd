import React from "react";
import { Snowfall, Snowflake } from "react-snowflakes";

const Snowflakes = () => {
  return (
    <React.Fragment>
      <Snowfall
        count={50}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        snowflakeFactory={(index) => {
          const size = index / 50; // 50 is the number of snowflakes.
          const w = 5 + 10 * size + "px";
          return (
            <Snowflake
              speed={0.05 + size * 2}
              xSpeedPrc={0.3 * size}
              ySpeedPrc={0.1 * size}
              style={{
                width: w,
                height: w,
                borderRadius: "50%",
                backgroundColor: "#FFF",
                opacity: 0.2 + 0.8 * size,
                filter: `blur(${Math.round(Math.max(size - 0.5, 0) * 15)}px)`,
              }}
            />
          );
        }}
      />
    </React.Fragment>
  );
};
export default Snowflakes;
