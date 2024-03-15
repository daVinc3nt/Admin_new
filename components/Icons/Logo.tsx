import * as React from "react";
import Image from "next/image";
function Logo({ fill = "#3B81F6", ...rest }) {
  return (
    <Image
    src="/Logo.png"
    alt="/"
    width="40"
    height="40"
    style={{objectFit: "cover"}}
  />
  );
}

export default Logo;
