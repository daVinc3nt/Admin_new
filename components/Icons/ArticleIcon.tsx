import * as React from "react";

function ArticleIcon({ fill = "#6C7281", ...rest }) {
  return (
    <svg
      width={30}
      height={30}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M19 5v14H5V5h14zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
        fill="#990012" 
      />
      <path d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#990012"  />
    </svg>
  );
}

export default ArticleIcon;
