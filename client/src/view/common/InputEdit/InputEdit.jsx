import React from "react";
import "./InputEdit.scss";

export default function InputEdit({
  color,
  textarea,
  disable,
  label,
  name,
  placeholder,
  opinion,
  value,
  errors,
  ...rest
}) {
  return (
    <div className="input-edit">
      <div className="input-edit__label">{label}</div>
      <div className="input-edit__input">
        {color ? (
          <div className="input-edit__color">
            <input
              type="text"
              name={name}
              value={value.color || "#000000"}
              className="input-edit__color--input"
              {...rest}
            />

            <input
              type="color"
              name={name}
              value={value.color || "#000000"}
              className="input-edit__color--picker"
              {...rest}
            />
          </div>
        ) : textarea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            value={value[name] || ""}
        
            {...rest}
          />
        ) : (
          <input
            disabled={disable}
            name={name}
            type="text"
            placeholder={placeholder}
            value={value[name] || ""}
            {...rest}
          />
        )}
      </div>
      <div className="input-edit__opinion">{opinion}</div>
      <div className="input-edit__error">{errors[name]}</div>
    </div>
  );
}
