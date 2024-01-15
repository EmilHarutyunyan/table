// Styles
import {
  deleteBox,
  selectBinPacking,
  setBoxesSlice,
  setUniqColor,
} from "@/app/features/binPacking/binPackingSlice";
import { randomColor } from "@/utils/utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styles from "./CalcInput.module.css";
import CalcAction from "./CalcAction";

const CalcInput = () => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [count, setCount] = useState(1);
  const { boxAspect, uniqColor, boxes } = useSelector(selectBinPacking);

  const getUniqColor = (uniqColor) => {
    let color = "";
    while (!color) {
      color = randomColor();
      if (uniqColor.includes(color)) color = "";
    }
    return color;
  };
  const handleAddSlice = (e) => {
    e.preventDefault();

    if (width !== "" || height !== "") {
      const color = getUniqColor(uniqColor);
      console.log(+width / boxAspect);
      const data = {
        width: Math.round(+width / boxAspect),
        height: Math.round(+height / boxAspect),
        count: +count,
        realWidth: +width,
        realHeight: +height,
        color,
        id: uuidv4(),
      };
      dispatch(setBoxesSlice([...boxes, data]));
      dispatch(setUniqColor(color));
      setWidth("");
      setHeight("");
      setCount(1);
    }
  };
  return (
    <div className={styles.calcWrapper}>
      <form onSubmit={handleAddSlice}>
        <label>
          Weight
          <input
            type="number"
            name="width"
            value={width}
            max={'1830'}
            onChange={(e) => setWidth(e.target.value)}
          />
        </label>
        <label>
          Height
          <input
            type="number"
            name="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            // onChange={(e) => handleSize(e.target.value, e.target.name)}
          />
        </label>
        <label>
          Count
          <input
            type="number"
            name="count"
            value={count}
            min="1"
            onChange={(e) => setCount(e.target.value)}
          />
        </label>
        <input type="submit" value="Add" />
      </form>
      {boxes.length
        ? boxes.map((box, idx) => (
            <CalcAction
              num={idx}
              key={box.id}
              box={box}
              boxes={boxes}
              boxAspect={boxAspect}
            />
          ))
        : null}
    </div>
  );
};

export default CalcInput;
