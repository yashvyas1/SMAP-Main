import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import useModal from "../hooks/useModal";

// Yup validation schema for the OTP verification form
const OTPVerificationSchema = Yup.object().shape({
  otp: Yup.array()
    .of(
      Yup.string()
        .matches(/^[0-9]$/, "Must be a number")
        .required("Required")
    )
    .required("OTP is required")
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits"),
});

const OTPVerificationModal = () => {
  const [timer, setTimer] = useState(120);
  const { openModal } = useModal();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleResendOTP = () => {
    setTimer(120);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const initialValues = {
    otp: ["", "", "", "", "", ""],
  };

  return (
    <div className="w-[41rem] h-[31rem] px-10 pt-16">
      <h2 className="text-3xl font-inter font-medium text-[#333333] px-10">
        OTP Verification
      </h2>
      <p className="text-left text-[#666666] font-inter font-normal text-base pl-10 pr-32 py-4">
        Enter the 6 digit verification code received on your phone/ email id
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={OTPVerificationSchema}
        onSubmit={(values) => {
          openModal("ResetPasswordModal");
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="px-10">
            <div className="flex items-center justify-between mt-4">
              {initialValues.otp.map((_, index) => (
                <Field name={`otp[${index}]`} key={index}>
                  {({ field }) => (
                    <input
                      {...field}
                      type="text"
                      maxLength="1"
                      className="w-[4rem] h-[4rem] text-center border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[0-9]$/.test(value)) {
                          setFieldValue(`otp[${index}]`, value);
                          if (index < 5 && value) {
                            document.getElementById(`otp-${index + 1}`).focus();
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !field.value) {
                          if (index > 0) {
                            document.getElementById(`otp-${index - 1}`).focus();
                          }
                        }
                      }}
                      id={`otp-${index}`}
                    />
                  )}
                </Field>
              ))}
            </div>
            {errors.otp && touched.otp ? (
              <div className="text-red-500 text-base text-center mt-2">
                Invalid OTP
              </div>
            ) : null}
            <div className="flex justify-between items-center mt-4">
              <div className="text-gray-500">
                Verification code
                <span className="font-inter font-normal text-base">
                  {formatTime(timer)}
                </span>
              </div>
              <button
                type="button"
                className="text-blue-500 underline font-inter font-normal text-base"
                onClick={handleResendOTP}
                disabled={timer > 0}
              >
                Resend OTP
              </button>
            </div>
            <button
              type="submit"
              className="w-full h-20 px-4 py-2 text-white bg-[#0D4896] font-inter font-medium text-2xl rounded-lg focus:outline-none mt-10"
            >
              Verify
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OTPVerificationModal;
