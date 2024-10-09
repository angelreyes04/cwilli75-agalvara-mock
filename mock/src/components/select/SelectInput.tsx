import { Dispatch, SetStateAction, useState } from "react";
import "../../styles/main.css";
import { histEntry } from "./Select";
import { datasets } from '../../mocks/mockedData';

/**
 * A interface for SelectInput.
 *
 * @params
 * history: the array storing all previous history entries
 * setHistory: function to add new history entry to history array
 */
interface SelectInputProps {
  onDatasetSelect: (datasetName: string) => void;
}


export function SelectInput(props: SelectInputProps) {

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDatasetName = event.target.value;
    props.onDatasetSelect(selectedDatasetName);
  }

  return (
    <div className="dropdown-container">
      <select
        className="dropdown"
        onChange={handleChange}
        aria-label="Select a dataset"
        >
          <option value="">Select a dataset</option>
          {Object.keys(datasets).map((filePath) => (
            <option key ={filePath} value={filePath}>
              {filePath}
            </option>
          ))}
        </select>
    </div>
  );
  }
