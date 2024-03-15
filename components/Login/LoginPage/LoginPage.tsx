import { useState} from "react";
import SigninForm from "./SigninForm";
import RightOverlayContent from "./RightOverlayContent";
import { FormattedMessage, useIntl, IntlShape, } from "react-intl";
const LoginPage = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const intl = useIntl();
  const overlayBg =
    "bg-DarkRedGradient";

  return (
    <div className=" flex flex-col text-black items-center justify-center fixed z-50 inset-0 bg-red-100">
      <div className= "container w-11/12 h-120 lg:h-120 lg:w-4/6 max-w-5xl bg-white relative overflow-hidden rounded-lg">          
          <div
            id="signin"
            className="bg-white absolute left-0 h-[calc(100%)] w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out z-20"
          >
            <SigninForm />
          </div>
          <div
            id="overlay-container"
            className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition duration-700 ease-in-out z-100"
          >
            <div
              id="overlay"
              className="bg-DarkRedGradient relative -left-full h-full w-[200%] transform transition duration-700 ease-in-out translate-x-0"
            >
              <div
                id="overlay-right"
                className="w-1/2 h-full absolute flex justify-center items-center top-0 right-0 transform transition duration-700 ease-in-out translate-x-0"
              >
                <RightOverlayContent
                  isAnimated={false}
                  setIsAnimated={setIsAnimated}
                />
              </div>
            </div>
          
          
          </div>
      </div>
    </div>
  );
};

export default LoginPage;
