import * as React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import { useCityMatch } from "./utils";
import "@reach/combobox/styles.css";

let name = "Simulated Change";

function Example() {
  let [term, setTerm] = React.useState("Detroit");
  let [selection, setSelection] = React.useState("");
  let results = useCityMatch(term);
  let ref = React.useRef();

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  const handleSelect = (value) => {
    setSelection(value);
    setTerm("");
  };

  const handleSimulateChange = () => {
    setTerm("New York");
  };

  return (
    <div>
      <h2>Clientside Search</h2>
      <p>
        This example tests that changes to the controlled value of Combobox
        don't expand it unless we are actually typing. The initial value and
        programmatically set value here shouldn't open the Popover.
      </p>
      <p>Selection: {selection}</p>
      <p>Term: {term}</p>
      <p>
        <button onClick={handleSimulateChange}>
          Set value programmatically
        </button>
      </p>
      <Combobox onSelect={handleSelect} aria-label="choose a city">
        <ComboboxInput
          ref={ref}
          value={term}
          onChange={handleChange}
          autocomplete={false}
          style={{ width: 400 }}
        />
        {results && (
          <ComboboxPopover>
            {results.length === 0 && (
              <p>
                No Results{" "}
                <button
                  onClick={() => {
                    setTerm("");
                    ref.current.focus();
                  }}
                >
                  clear
                </button>
              </p>
            )}
            <ComboboxList>
              {results.slice(0, 10).map((result, index) => (
                <ComboboxOption
                  key={index}
                  value={`${result.city}, ${result.state}`}
                />
              ))}
            </ComboboxList>
            <p>
              <a href="/new">Add a record</a>
            </p>
          </ComboboxPopover>
        )}
      </Combobox>
    </div>
  );
}

Example.story = { name };
export const Comp = Example;
export default { title: "Combobox" };
