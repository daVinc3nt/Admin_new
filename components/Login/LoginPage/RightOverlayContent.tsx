import React from "react";
import { FormattedMessage, useIntl, IntlShape } from "react-intl";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import Logo_name from "public/Logo_name.png";
const welcome = <FormattedMessage id="signup.welcome.message" />;
interface RightOverlayContentProps {
  isAnimated: boolean;
  setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightOverlayContent: React.FC<RightOverlayContentProps> = ({
  isAnimated,
  setIsAnimated,
}) => {
  return (
    <div className="p-4 lg:p-8 text-center" data-aos="fade-up">
      <div className="border-spacing-1 border-2 border-white rounded-full bg-white pb-2">
        <img src={Logo_name.src} alt="logo" className="h-20 mx-auto" />
      </div>
      {/* 
      <h1 className="text-xl sm:text-5xl font-bold text-white mb-2 sm:mb-5">
        <FormattedMessage id="signup.warning" />
      </h1> */}

      <h5 className="text-xs sm:text-xl sm:mt-2 font-medium  text-white">
        <FormattedMessage id="signup.nosupport" />
      </h5>
    </div>
  );
};

export default RightOverlayContent;
