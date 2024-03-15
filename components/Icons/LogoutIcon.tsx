import * as React from "react";

function LogoutIcon({ fill = "#6C7281", ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" 
      viewBox="0 0 24 24" fill="none" stroke="#990012" strokeWidth="2" 
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9"/>
    </svg>
  );
}

export default LogoutIcon;
