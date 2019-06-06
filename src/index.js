/**@jsx jsx */
import { jsx } from "@emotion/core";

import ReactDOM from "react-dom";

import "./styles.css";
import { SegmentController, SegmentButton } from "./SegmentControl";

function onChangeHandler(values) {
  console.log({ values });
}

export const MySegmentControl = props => (
  <SegmentController onChange={onChangeHandler} allowMultiSelect>
    <div>
      <span>Label</span>
      <div
        css={{
          backgroundColor: "#D3D3D3",
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          border: "2px solid grey",
          borderRadius: "4px",
          fontSize: "1rem"
        }}
      >
        <SegmentButton label="label1" value={1} disabled />
        <SegmentButton label="label2" value={2} />
        <SegmentButton label="label3" value={3} />
        <SegmentButton label="label4" value={4} />
        <SegmentButton label="label5" value={5} />
        <SegmentButton label="label6" value={6} />
      </div>
    </div>
  </SegmentController>
);

export const MyLinearSegmentControl = props => (
  <SegmentController onChange={onChangeHandler}>
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <span>Label</span>
      <div
        css={{
          border: "2px solid grey",
          borderRadius: "4px",
          backgroundColor: "#D3D3D3",
          fontSize: "1rem"
        }}
      >
        <SegmentButton
          label="label1"
          value={1}
          css={{ padding: "0 10px 0 10px" }}
        />
        <SegmentButton
          label="label2"
          value={2}
          css={{ padding: "0 5px 0 5px" }}
        />
      </div>
    </div>
  </SegmentController>
);

function App() {
  return (
    <div>
      <MySegmentControl />
      <br />
      <br />
      <MySegmentControl />
      <br />
      <br />
      <MyLinearSegmentControl />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
