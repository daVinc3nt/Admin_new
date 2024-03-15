import * as React from "react";

function GraphIcon({ fill = "#6C7281", ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
        width="30" height="30" viewBox="0 0 24 24" fill="none" 
        stroke="#990012" strokeWidth="2" 
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
    </svg>
  );
}

export default GraphIcon;
