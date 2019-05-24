import React from "react";

import "./SelectBox.css";

const SelectBox = props => {
  return (
    <div className="form-group">
      <select
        id={props.name}
        name={props.name}
        value={props.defaultValue}
        onChange={props.onChange}
        className="form-control"
      >
        <option selected="selected" value="" disabled>
          {props.placeholder}
        </option>
        {props.options.map((option, idx) => {
          return (
            <option
              type="text"
              data-key={idx}
              key={option}
              value={option}
              label={option}
            >
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectBox;
