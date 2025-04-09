"use client";

import * as d3 from "d3";
import { useState, useEffect, useRef } from "react";
import SwitchButton from "@/app/SharedComponents/SwitchButton";
import { BarsIcon, GraphIcon } from "@/app/SharedComponents/Icons";
import './Graph.scss';

const BAR_WIDTH = 10;
const GAP = 20;
const MAX_VALUE = 100;
const BARS_COUNT = 200;
const GRAPH_WIDTH = (BARS_COUNT + 2) * (BAR_WIDTH + GAP);
const GRAPH_HEIGHT = 400;
const MARGIN = 0.05;

const Graph = () => {
  const [showBars, setShowBars] = useState(true);
  const [data, setData] = useState<{ name: string; value: number; }[]>([]);

  useEffect(() => {
    const array = new Array(BARS_COUNT).fill(0).map((_, i) => ({
      name: `Day ${i + 1}`,
      value: Math.floor(Math.random() * MAX_VALUE),
    }));
    setData(array);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-[800px] items-start bg-[var(--graph-bg)] p-5 rounded-2xl h-fit md:p-10">
      <SwitchButton title={showBars ? 'Bars View' : 'Graph View'}
        checked={showBars}
        onClick={() => setShowBars(!showBars)}
        offIcon={<GraphIcon width={48} height={48} />}
        onIcon={<BarsIcon width={48} height={48} />}
      />
      <div className="GraphMainContainer">
        <YAxis />
        {showBars ? <Bars data={data} /> : <Curve data={data} />}
      </div>
    </div>
  );
};

export default Graph;


const YAxis = () => {
  const yAxisRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (!yAxisRef.current) return;

    const yScale = d3.scaleLinear()
      .domain([0, MAX_VALUE])
      .range([(1 - MARGIN * 2) * GRAPH_HEIGHT, 0]);
    const yAxis = d3.axisRight(yScale).ticks(5);

    d3.select(yAxisRef.current).call(yAxis)
      .attr("transform", `translate(0,${GRAPH_HEIGHT * MARGIN})`);
    d3.select(yAxisRef.current).selectAll("text")
      .attr("dx", "0.6");
  }, []);

  return (
    <svg width={28} height={"100%"} style={{ position: "sticky", left: 0 }}>
      <g ref={yAxisRef} />
    </svg>
  );
};

const Bars = ({ data }: { data: { name: string; value: number; }[]; }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    addGridLines(svgRef, data.length);
  }, [data]);

  return (
    <svg ref={svgRef} width={GRAPH_WIDTH} height={"100%"}>
      {data.map((bar, index) => {
        const barHeight = bar.value / MAX_VALUE * GRAPH_HEIGHT * 0.9;
        const barStartX = (index + 1) * (BAR_WIDTH + GAP);
        const barStartY = ((1 - bar.value / MAX_VALUE) * 0.9 + MARGIN) * GRAPH_HEIGHT;
        const textStartX = barStartX + BAR_WIDTH / 2;
        const textStartY = barStartY - 2;
        return (
          <g key={index} className="bar">
            <rect
              x={barStartX}
              y={`${barStartY}`}
              width={BAR_WIDTH}
              height={`${barHeight}`}
              rx={BAR_WIDTH / 2}
              ry={BAR_WIDTH / 2}
            />
            <text textAnchor="middle"
              x={textStartX}
              y={`${textStartY}`}
            >{bar.value}</text>
          </g>
        );
      })}
    </svg>
  );
};

const Curve = ({ data }: { data: { name: string; value: number; }[]; }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const xAxisRef = useRef<SVGGElement | null>(null);

  // const updatedData = data.map((bar, i) => [i, bar.value] as [number, number]);
  const updatedDataOne = data.map((bar, i) => [i, bar.value] as [number, number]).filter((_, i) => i % 2 === 0);
  const updatedDataTwo = data.map((bar, i) => [i, bar.value] as [number, number]).filter((_, i) => i % 2 === 1);

  useEffect(() => {
    if (!xAxisRef.current) return;

    const xScale = d3.scaleLinear()
      .domain([0, updatedDataOne.length + 1])
      .range([0, GRAPH_WIDTH]);

    const xAxis = d3.axisTop(xScale).ticks(updatedDataOne.length + 2);

    d3.select(xAxisRef.current).call(xAxis)
      .attr("transform", `translate(0,${(1 - MARGIN) * GRAPH_HEIGHT})`);
    d3.select(xAxisRef.current).selectAll("text")
      .attr("dy", "-0.6");

    addGridLines(svgRef, updatedDataOne.length);
  }, [updatedDataOne, updatedDataTwo]);

  if (updatedDataTwo.length < 2) return null;

  return (
    <svg ref={svgRef} width={GRAPH_WIDTH} height={"100%"}>
      <path className="curve"
        d={d3.line()
          .curve(d3.curveCatmullRom)
          .x((d, i) => (i + 1) * (BAR_WIDTH + GAP) * 2)
          .y(d => ((1 - d[1] / MAX_VALUE) * 0.9 + MARGIN) * GRAPH_HEIGHT)(updatedDataOne)! +
          `L ${BARS_COUNT * (BAR_WIDTH + GAP)} ${(1 - MARGIN) * GRAPH_HEIGHT} L ${(BAR_WIDTH + GAP) * 2} ${(1 - MARGIN) * GRAPH_HEIGHT} Z`}
        strokeWidth="2"
        stroke="#007BFF"
        fill="rgba(0, 123, 255, 0.3)"
      />
      <path className="curve"
        d={d3.line()
          .curve(d3.curveCatmullRom)
          .x((d, i) => (i + 1) * (BAR_WIDTH + GAP) * 2)
          .y(d => ((1 - d[1] / MAX_VALUE) * 0.9 + MARGIN) * GRAPH_HEIGHT)(updatedDataTwo)! +
          `L ${BARS_COUNT * (BAR_WIDTH + GAP)} ${(1 - MARGIN) * GRAPH_HEIGHT} L ${(BAR_WIDTH + GAP) * 2} ${(1 - MARGIN) * GRAPH_HEIGHT} Z`}
        strokeWidth="2"
        stroke="#7B00FF"
        fill="rgba(123, 0, 255, 0.3)"
      />
      <g ref={xAxisRef} />
    </svg>
  );
};

const addGridLines = (svgRef: React.RefObject<SVGSVGElement | null>, length: number) => {
  if (!svgRef.current) return;

  const xScale = d3.scaleLinear()
    .domain([0, length + 1])
    .range([0, GRAPH_WIDTH]);

  const yScale = d3.scaleLinear()
    .domain([0, MAX_VALUE])
    .range([(1 - MARGIN * 2) * GRAPH_HEIGHT, 0]);

  d3.select(svgRef.current).selectAll(".grid-line")
    .data(xScale.ticks(10))
    .enter().append("line")
    .attr("class", "grid-line")
    .attr("x1", d => xScale(d))
    .attr("y1", 0)
    .attr("x2", d => xScale(d))
    .attr("y2", (1 - MARGIN * 2) * GRAPH_HEIGHT)
    .attr("stroke", "#bbb")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "2,7")
    .attr("transform", `translate(0,${GRAPH_HEIGHT * MARGIN})`);

  d3.select(svgRef.current).selectAll(".grid-line-y")
    .data(yScale.ticks(10))
    .enter().append("line")
    .attr("class", "grid-line-y")
    .attr("x1", 0)
    .attr("y1", d => yScale(d))
    .attr("x2", GRAPH_WIDTH)
    .attr("y2", d => yScale(d))
    .attr("stroke", "#bbb")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "2,7")
    .attr("transform", `translate(0,${GRAPH_HEIGHT * MARGIN})`);
};
