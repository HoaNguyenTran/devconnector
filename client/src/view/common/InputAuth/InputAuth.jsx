import React from "react";
import styled from "styled-components";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";

import "./InputAuth.scss";

const Input = styled.div`
  border: 2px solid ${(props) => (props.error ? "#ff3333" : "#3b49df")};
`;

const Icon = styled.div`
  color: ${(props) => (props.error ? "#ff3333" : "#3b49df")};
`;

export default function InputAuth({
  value,
  errors,
  autoFocus,
  label,
  name,
  placeholder,
  type,
  component: Component,
  vision,
  onClickVision,
  ...rest
}) {
  return (
    <>
    <div className="input-auth__label">{label}</div>
      <Input error={errors[name]} className="input-auth__input">
        <Icon error={errors[name]} className="input-auth__input--icon">
          <Component />
        </Icon>
        <input
          autoFocus={autoFocus}
          name={name}
          placeholder={placeholder}
          type={type === "text" ? "text" : vision[name] === "on" ? "text" : "password"}
          value={value[name]}
          {...rest}
        />
        {type === "password" && (
          <div className="eye">
            {vision[name] === "off" && (
              <Icon
                className="input-auth__input--icon"
                error={errors[name]}
                onClick={() => onClickVision(name, "on")}
              >
                <VisibilityOffOutlinedIcon />
              </Icon>
            )}

            {vision[name] === "on" && (
              <Icon
                className="input-auth__input--icon"
                error={errors[name]}
                onClick={() => onClickVision(name, "off")}
              >
                <VisibilityOutlinedIcon />
              </Icon>
            )}
          </div>
        )}
      </Input>
      <div className="input-auth__error">{errors[name]}</div>
    </>
  );
}
