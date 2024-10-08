import "../../styles/main.css";
import { histEntry } from "./Select";

/**
 * A interface for the props that are passed into SelectHistory.
 *
 * @params
 * history: an array holding the history entries that are to be
 *  outputted to the end-user in the main output area
 */
interface SelectHistoryProps {
  history: Array<histEntry>;
}

/**
 * Builds a SelectHistory component that displays the output area according
 *  to any commands inputted by the user.
 *
 * @param props the history entries (see SelectHistoryProps for more details)
 * @returns JSX that will print a tabular view of the passed in data
 */
export function SelectHistory(props: SelectHistoryProps) {
  return (
    <div className="select-history" aria-label="select history">
      {/* TODO 2: add to the JSX to display your text in the main output area!  */}
      {props.history.map((entry, index) => (
        <div key={index}>
          <p>{entry.data}</p>
        </div>
      ))}
    </div>
  );
}
