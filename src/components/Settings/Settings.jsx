import {
  changeSpace,
  decrement,
  increment,
  selectBinPacking,
} from "@/app/features/binPacking/binPackingSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Settings.module.css";
const Settings = () => {
  const { space } = useSelector(selectBinPacking);
  const dispatch = useDispatch();
  return (
    <div className={styles.settings}>
      <div className={styles.settingItems}>
        <div>
          <p>Space</p>
          <div>
            <input
              onClick={() => {
                dispatch(decrement());
              }}
              type="button"
              value={"-"}
            />

            <input
              type="number"
              onChange={(e) => dispatch(changeSpace(+e.target.value))}
              value={space}
            />
            <input
              type="button"
              value={"+"}
              onClick={() => dispatch(increment())}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
