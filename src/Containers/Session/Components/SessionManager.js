import React from "react";

export const SessionManager = ({isMounted}) => {
  return isMounted ? props.children : null;
};