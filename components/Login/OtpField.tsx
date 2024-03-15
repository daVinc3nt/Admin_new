import React, { FC, useState, useRef, useEffect} from "react";
import { useRouter } from 'next/router'
import { FormattedMessage } from "react-intl";
import { StaffsAuthenticate } from "@/TDLib/tdlogistics";
interface OptFieldProps {
    showOtp: boolean;
    setshowOtp: React.Dispatch<React.SetStateAction<boolean>>;
    phone: string;
    mail: string;
  }
let currentOTPIndex: number = 0;
const OTPField: FC<OptFieldProps> = ({showOtp, setshowOtp, phone, mail}) => {
    const [otp1, setOtp] = useState<string[]>(new Array(4).fill(""));
    const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter();
    const handleOnKeyDown = (
        { key }: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        currentOTPIndex = index
        // if (key < '0' || key > '9' || key !== "Backspace") return
        if ( key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
    };

    const handleOnChange = (
        { target }: React.ChangeEvent<HTMLInputElement>,
       ): void => {
        const { value } = target;
        if (value && value !=="0" &&!Number(value)) {
            return;
        }
        const newOTP: string[] = [...otp1];
        newOTP[currentOTPIndex] = value.substring(value.length - 1);
        if (!value) setActiveOTPIndex(currentOTPIndex - 1)
        else setActiveOTPIndex(currentOTPIndex + 1);
        setOtp(newOTP);
        //verify
        if ( otp1.some((element) => element !== "") )
        {
            console.log("bắt đầu check");
            let CheckOtp = otp1.join("");
            const staffsAuthenticate= new StaffsAuthenticate()
            staffsAuthenticate.verifyOTP(phone, mail, CheckOtp )
            .then(valid => {
                if (!valid) {
                    return console.log("OTP không hợp lệ. Vui lòng thử lại!");
                }
                else 
                router.push("/dashboard");
            })
            .catch(error => console.log(error))
        }
    }
    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOTPIndex]);

    return (
        <>
        <div className="flex flex-col justify-center items-center space-x-2">
            <div className="flex justify-center items-center space-x-1 sm:space-x-2">
            {otp1.map((_, index) => {
                return (
                    <React.Fragment key={index}>
                        <input
                            ref={index === activeOTPIndex ? inputRef : null}
                            type="tel"
                            inputMode="numeric"
                            className="w-9 h-9 sm:w-14 sm:h-14 bg-gray-300 border-2 rounded-lg outline-none border- text-center font-semibold text-sm sm:text-2xl spin-button-none focus:border-gray-700 focus:text-black text-black transition"
                            onChange={handleOnChange}
                            onKeyDown={(e) => handleOnKeyDown(e, index)}
                            value={otp1[index]}
                        />
                    </React.Fragment>
                );
            })}
            </div>
        <button
            type="submit"
            onClick={(e) => setshowOtp(!showOtp)}
            className="mt-10 py-3 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500
            text-white font-bold uppercase text-xs text-center block w-3/4 focus:outline-none 
            cursor-pointer lg:mt-20 sm:text-sm"
            >
            <FormattedMessage id="sms.getback" />
        </button>
        </div>
        </>
    );
};

export default OTPField;