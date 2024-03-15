import React from 'react';
import { FormattedMessage, useIntl, IntlShape, } from "react-intl";

interface LeftOverlayContentProps {
  isAnimated: boolean;
  setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>;
}
const LeftOverlayContent: React.FC<LeftOverlayContentProps> = ({ isAnimated, setIsAnimated }) => {
  return (
    <div className="pl-14 sm:pl-48 sm:p-8 text-center">
      <h1 className="text-xl sm:text-5xl font-bold text-white mb-2 sm:mb-5">
        <FormattedMessage id="signinpage.have_account"/>
      </h1>

      <h5 className="text-xs sm:text-lg mt-4 sm:mt-5 text-white">
        <FormattedMessage id="signinpage.create_new"/>
      </h5>
      <div className="mt-4 sm:mt-5">
      <button type="button" className="text-white text-xs sm:text-sm uppercase ring-2 ring-white bg-transparent active:scale-110 font-bold rounded-full px-2 py-1.5 sm:px-5 sm:py-2.5 text-center inline-flex items-center transition-transform ease-in"
        onClick={(e) => {
          setIsAnimated(!isAnimated);
        }}
        >
          <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
          </svg>
          <FormattedMessage id="signinpage.signup"/>
        </button>
      </div>
    </div>
  );
};

export default LeftOverlayContent;
