import { Dispatch, SetStateAction, useState } from "react";
import "../../styles/main.css";
import { histEntry } from "./Select";

/**
 * A interface for SelectInput.
 *
 * @params
 * history: the array storing all previous history entries
 * setHistory: function to add new history entry to history array
 */
interface SelectInputProps {
  history: Array<histEntry>;
  setHistory: Dispatch<SetStateAction<Array<histEntry>>>;
}


export function SelectInput(props: SelectInputProps) {
  function handleSubmit(text: string) {
    let newEntry: histEntry = {
      data: text,
    };
    props.setHistory([...props.history, newEntry]);
  }
  return (
    <div className="dropdown-container">
      <select
        className="dropdown"
        name="dropdown"
        id="dropdown"
        aria-label="dropdown"
      >
        <option>Nim Telson</option>
        <option>Angel</option>
        <option>Bagel</option>
        {/* TODO 1: add more options to the dropdown here */}
      </select>
      {/* TODO 2: add a button here to display the current dropdown option as text
            on the main output area
            (Hint: use the setHistory useState set function) 
  */ <button
  onClick={() => {
    const selectElement = document.getElementById(
      "dropdown"
    ) as HTMLSelectElement | null;
    const selectText =
      selectElement?.options[selectElement.selectedIndex]?.text;
    if (selectText != null) {
      handleSubmit(selectText);
    }
  }}
  aria-label="submit"
  >Submit</button>}
    </div>
  );
  }
