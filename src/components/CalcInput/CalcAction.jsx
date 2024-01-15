import {
	deleteBox,
	setBoxesSlice,
} from "@/app/features/binPacking/binPackingSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./CalcInput.module.css"
const CalcAction = ({ boxes, box, boxAspect,num }) => {
	const dispatch = useDispatch();
	const [width, setWidth] = useState(box.realWidth);
	const [height, setHeight] = useState(box.realHeight);
	const [count, setCount] = useState(box.count);
	const handleDelete = id => {
		dispatch(deleteBox(id));
	};
	const handleChange = (e, box) => {
		e.preventDefault();
		const data = {
      ...box,
      width: Math.round(+width / boxAspect),
      height: Math.round(+height / boxAspect),
      count: +count,
      realWidth: +width,
      realHeight: +height,
    };
		const newBoxes = boxes.map(box => {
			if (box.id === data.id) {
				return data;
			}
			return box;
		});
		dispatch(setBoxesSlice([...newBoxes]));
	};
	return (
    <div className={styles.calcActionWrap}>
      <p>{num + 1}</p>
      <form onSubmit={(e) => handleChange(e, box)} key={box.id}>
        <label>
          Weight
          <input
            type="number"
            name="width"
            value={width}
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
          />
        </label>
        <label>
          Count
          <input
            type="number"
            name="count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </label>
        <input type="submit" value="Change" />
        <input type="button" value={'Delete'} onClick={() => handleDelete(box.id)}/>        
      </form>
    </div>
  );
};

export default CalcAction;
