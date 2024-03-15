import * as React from "react";

function HelpIcon({ fill = "#6C7281", ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
    width="30" height="30" fill="none"  viewBox="0 0 24 24"  
    stroke="#990012" strokeWidth="2" strokeLinecap="round" 
    strokeLinejoin="round" className="feather feather-help-circle" 
    id="IconChangeColor"><circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" id="mainIconPathAttribute"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>

  );
}

export default HelpIcon;
