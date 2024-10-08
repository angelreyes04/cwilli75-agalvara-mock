import { useState } from "react";
import "../../styles/main.css";
import { SelectInput } from "./SelectInput";
import { SelectHistory } from "./SelectHistory";

/**
 * A histEntry interface to structure each single output stored in the main output area
 *
 * @params
 * data: the result of running the command; can be string or 2D array holding string
 */
export interface histEntry {
  data: string;
}

/**
 * A modal tab representing a note
 *
 * @params
 * id: an unique note id
 * title: the title of the note
 * content: main content of a note
 */
export interface Tab {
  id: number;
  title: string;
  content: string;
}

/**
 * Builds a Select component object that provides a dropdown to view current datasets available
 *
 * @returns A JSX element that includes a dropdown, after selection, display the dataset in tabular form
 *
 */
export function Select() {
  // TODO 2: set-up a React useState variable here to update the main display area once you click the submit button,
  //    then, pass this variable in as a prop to SelectHistory below and uncomment it
  const [history, setHistory] = useState<histEntry[]>([]);

  return (
    <div className="min-h-[95vh] relative">
      <div className="w-full" style={{ width: "100%" }}>
        <div className="select-container" aria-lable="Select container">
          {<pre><SelectHistory history={history}/></pre>}
        </div>
        <hr></hr>
        <SelectInput history={history} setHistory={setHistory} />
      </div>
    </div>
  );
}
