import React, { useState } from "react";
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 20) : text}
      <span onClick={toggleReadMore} className="hover:underline">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};
export default ReadMore
  