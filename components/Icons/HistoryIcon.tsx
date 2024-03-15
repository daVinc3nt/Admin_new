import * as React from "react";

function HistoryIcon({ fill = "#6C7281", ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
        width="30" height="30" viewBox="0 0 24 24" 
        fill="none" stroke="#990012" strokeWidth="2" 
        strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}

export default HistoryIcon;
