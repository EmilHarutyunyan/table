import { selectBinPacking } from "@/app/features/binPacking/binPackingSlice";
import { Packer } from "@/lib";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Table.module.css";

const Table = () => {
  const { paper, boxes, space, sortAlgorithm } = useSelector(selectBinPacking);
  const [canvasItem, setCanvasItem] = useState([]);
  const canvasRef = useRef(null);
  const canvasWrapper = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      
      if (canvasItem.length) {
        canvasItem.forEach((canvas) => canvas.remove());
        setCanvasItem([]);
      }
      run(canvasRef.current, boxes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, boxes, space, sortAlgorithm]);

  const run = (canvas, boxes, isReport = false) => {
    const blocks = isReport ? boxes : deserializeBlocks(boxes);
    const packer = createPacker(space);
    sortBlocks(blocks);
    packer.fit(blocks);
    resetCanvas(canvas, packer.root.w, packer.root.h, isReport);
    drawBlocks(canvas, blocks);
    report(blocks, packer.root.w, packer.root.h);
  };

  const createCanvas = (width, height) => {
    const canvas = document.createElement("canvas");
    canvas.width = `${width}px`;
    canvas.height = `${height}px`;
    return canvas;
  };

  const report = (blocks) => {
    const newBlocks = blocks.filter((block) => !block.fit);

    if (newBlocks.length > 0) {
      const canvas = createCanvas(paper.width, paper.height);
      canvasWrapper.current.appendChild(canvas);
      setCanvasItem((prev) => [...prev, canvas]);
      run(canvas, newBlocks, true);
    }
  };
  const createPacker = (space) => {
    return new Packer(paper.width, paper.height, space);
  };

  const sortBlocks = (blocks) => {
    const sortedBlocks = [...blocks];
    sortedBlocks.sort((a, b) => sortCriteria[sortAlgorithm](a, b));
  };

  const resetCanvas = (canvas, width, height) => {
    const context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawBlocks = (canvas, blocks) => {
    const context = canvas.getContext("2d");

    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].fit) {
        const block = blocks[i];
        const fontSize = block.w <= 50 ? "8px" : "14px";
        const textX = block.fit.x;
        const textY = block.fit.y + 13;
        context.font = `bold ${fontSize} Roboto`;
        context.fillStyle = block.color;
        context.fillRect(block.fit.x, block.fit.y, block.w, block.h);
        context.fillStyle = "black";
        context.fillText(`${block.rw}x${block.rh}`, textX, textY);
      }
    }
  };

  const msort = (a, b, criteria) => {
    let diff, n;

    for (n = 0; n < criteria.length; n++) {
      diff = sortCriteria[criteria[n]](a, b);
      if (diff !== 0) return diff;
    }
    return 0;
  };

  const sortCriteria = {
    random: () => Math.random() - 0.5,
    w: (a, b) => b.w - a.w,
    h: (a, b) => b.h - a.h,
    a: (a, b) => b.area - a.area,
    max: (a, b) => Math.max(b.w, b.h) - Math.max(a.w, a.h),
    min: (a, b) => Math.min(b.w, b.h) - Math.min(a.w, a.h),
    height: (a, b) => msort(a, b, ["h", "w"]),
    width: (a, b) => msort(a, b, ["w", "h"]),
    area: (a, b) => msort(a, b, ["a", "h", "w"]),
    maxside: (a, b) => msort(a, b, ["max", "min", "h", "w"]),
  };

  const deserializeBlocks = (blocks) => {
    const result = [];
    for (let i = 0; i < blocks.length; i++) {
      result.push({
        w: blocks[i].width,
        h: blocks[i].height,
        num: blocks[i].count,
        rw: blocks[i].realWidth,
        rh: blocks[i].realHeight,
        color: blocks[i].color,
      });
    }
    const expanded = [];
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].num; j++) {
        expanded.push({
          w: result[i].w,
          h: result[i].h,
          area: result[i].w * result[i].h,
          rw: result[i].rw,
          rh: result[i].rh,
          color: result[i].color,
        });
      }
    }
    return expanded;
  };
  return (
    <div className={`${styles.canvasWrapper}`} ref={canvasWrapper}>
      <p>1830x3630</p>

      <canvas width={paper.width} height={paper.height} ref={canvasRef} />
    </div>
  );
};

export default Table;
