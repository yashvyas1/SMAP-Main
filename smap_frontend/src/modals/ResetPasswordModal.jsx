import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import useModal from "../hooks/useModal";

// Yup validation schema for the reset password form
const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
      "Password must include an uppercase letter, a lowercase letter, a number, and a special character."
    )
    .test(
      "password-length",
      "Password must be between 8 to 15 characters.",
      (value) => {
        if (value) {
          return value.length >= 8 && value.length <= 15;
        }
        return true;
      }
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPasswordModal = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);
  const { openModal } = useModal();

  const passwordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const confPasswordVisibility = () => {
    setConfPasswordVisible(!confPasswordVisible);
  };

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  return (
    <div className="w-[41rem] h-[31rem] px-10 pt-16">
      <h2 className="text-3xl font-inter font-medium text-[#333333] px-10">
        Forgot Your Password
      </h2>
      <p className="text-left text-[#666666] font-inter font-normal text-lg pl-10 pr-24 py-4">
        Enter a new password for autoposter
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={ResetPasswordSchema}
        onSubmit={(values) => {
          openModal("SuccessfulModal");
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="px-10">
            <div className="">
              <label className="mb-1 text-[#666666] font-inter font-normal text-base">
                Password
              </label>
              <div className="flex relative">
                <Field
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  className="w-[30rem] h-14 px-3 py-2 mt-1 bg-[#CBD5E1]/30 border border-[#666666]/35 rounded-xl focus:outline-none"
                  placeholder="Enter Your Password"
                  maxLength={15}
                />
                <button
                  type="button"
                  onClick={passwordVisibility}
                  className="text-gray-500 right-5 inset-y-2 pr-3 absolute focus:outline-none"
                >
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && touched.password ? (
                <div className="text-red-500 text-base">{errors.password}</div>
              ) : null}
            </div>
            <div className="mt-4">
              <label className="mb-1 text-[#666666] font-inter font-normal text-base">
                Confirm Password
              </label>
              <div className="flex relative">
                <Field
                  name="confirmPassword"
                  type={confPasswordVisible ? "text" : "password"}
                  className="w-[30rem] h-14 px-3 py-2 mt-1 bg-[#CBD5E1]/30 border border-[#666666]/35 rounded-xl focus:outline-none"
                  placeholder="Enter Your Confirm Password"
                />
                <button
                  type="button"
                  onClick={confPasswordVisibility}
                  className="text-gray-500 right-5 inset-y-2 pr-3 absolute focus:outline-none"
                >
                  {confPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className="text-red-500 text-base">
                  {errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-[30rem] h-20 px-4 py-2 text-white bg-[#0D4896] font-inter font-medium text-2xl rounded-lg focus:outline-none mt-10"
            >
              Reset Password
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordModal;
