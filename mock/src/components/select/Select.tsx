import { useState } from "react";
import "../../styles/main.css";
import { SelectInput } from "./SelectInput";
import { SelectHistory } from "./SelectHistory";
import { datasets } from '../../mocks/mockedData';
import { BarChartView } from '../bar chart/BarChartView';

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
  const [selectedData, setData] = useState<any[] | null>(null);
  const [selectedFilePath, setFilePath] = useState<string>("");
  const [visualizationType, setVisualizationType] = useState<string>("table");

  const handleDataSelect = (filePath: string) => {
    setFilePath(filePath);
    setData(datasets[filePath]);
  };

  return (
    <div className="select-container">
      <SelectInput 
        onDatasetSelect={handleDataSelect}
        selectedDataset={selectedFilePath}
      />
      {selectedData && (
        <div>
          <div className="visualization-toggle">
            <button 
              onClick={() => setVisualizationType("table")}
              className={visualizationType === "table" ? "active" : ""}
            >
              Table View
            </button>
            <button 
              onClick={() => setVisualizationType("bar")}
              className={visualizationType === "bar" ? "active" : ""}
            >
              Bar Chart
            </button>
          </div>
          {visualizationType === 'table' ? (
            <SelectHistory data={selectedData} datasetName={selectedFilePath} />
          ) : (
            <BarChartView data={selectedData} selectedDatasetName={selectedFilePath} />
          )}
        </div>
      )}
    </div>
  );
}