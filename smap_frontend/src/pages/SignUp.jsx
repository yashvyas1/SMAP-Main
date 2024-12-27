import axios from "axios";
import { Field, Form, Formik } from "formik";
import { PhoneNumberUtil } from "google-libphonenumber";
import moment from "moment";
import React, { useState } from "react";
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import PosterImage from "../assets/images/poster-img.png";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

// Schema for signup form validation using Yup
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First Name is too short")
    .max(25, "First Name is too long")
    .required("First Name is required")
    .matches(
      /^[A-Z][a-zA-Z]*$/,
      "First Name should start with a capital letter."
    ),
  lastName: Yup.string()
    .min(2, "Last Name is too short")
    .max(25, "Last Name is too long")
    .required("Last Name is required")
    .matches(
      /^[A-Z][a-zA-Z]*$/,
      "Last Name should start with a capital letter."
    ),
  mobile_no: Yup.string()
    .required("Contact Number is required")
    .test("is-valid-phone", "Contact is not valid", (value) =>
      value ? isPhoneValid(value) : true
    ),
  dob: Yup.string()
    .required("Date of Birth is required")
    .test("Invalid Date of Birth", (value) =>
      moment(value, "MM/DD/YYYY", true).isValid()
    ),
  email: Yup.string()
    .trim()
    .lowercase()
    .matches(
      /^[a-z0-9]+(?:[._%+-]?[a-z0-9]+)*@[a-z0-9]+(?:\.[a-z0-9]+)+$/,
      "Invalid email address"
    )
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .test(
      "password-length",
      "Password must be between 8 to 15 characters.",
      (value) => {
        if (value) {
          return value.length >= 8 && value.length <= 15;
        }
        return true;
      }
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
      "Password must include an uppercase letter, a lowercase letter, a number, and a special character."
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const CustomPhoneInput = ({
  customClassName,
  field,
  form: { setFieldValue, setFieldTouched },
  value,
  onChange,
  onBlur,
}) => {
  return (
    <PhoneInput
      className={`${customClassName}`}
      defaultCountry="in"
      value={value}
      onChange={(mobile_no) => {
        onChange(mobile_no);
        setFieldValue(field.name, mobile_no);
      }}
      onBlur={(e) => {
        onBlur(e);
        setFieldTouched(field.name, true);
      }}
    />
  );
};

// Validation of phone number
const phoneUtil = PhoneNumberUtil.getInstance();
const isPhoneValid = (phone) => {
  if (!phone) {
    return false;
  }
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [backendError, setBackendError] = useState("");
  const navigate = useNavigate();

  const passwordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const confPasswordVisibility = () => {
    setConfPasswordVisible(!confPasswordVisible);
  };

  const capitalizeFirstLetter = (str) => {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const toLowerCase = (str) => str.toLowerCase();

  const sanitizeEmail = (value) => {
    let sanitizedValue = value.replace(/[^a-z0-9@.]/g, "");
    const atCount = (sanitizedValue.match(/@/g) || []).length;
    const dotCount = (sanitizedValue.match(/\./g) || []).length;
    if (atCount > 1) {
      sanitizedValue = sanitizedValue.replace(/@/g, (match, offset, str) =>
        str.indexOf("@") === offset ? "@" : ""
      );
    }
    if (dotCount > 1) {
      sanitizedValue = sanitizedValue.replace(/\./g, (match, offset, str) =>
        str.indexOf(".") === offset ? "." : ""
      );
    }
    return sanitizedValue;
  };

  const disableFutureDates = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    mobile_no: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div className="flex h-screen flex-col md:flex-row items-center justify-center p-4 bg-[#d1daff] w-full rounded-lg shadow-lg">
      <div className="hidden md:flex md:w-1/2 justify-center">
        <img
          className="rounded-lg w-full h-auto"
          src={PosterImage}
          alt="Poster"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 rounded-lg">
        <div className="w-full p-8 max-w-xl lg:w-3/4 bg-[#d1daff] rounded-lg shadow-2xl">
          <h2 className="text-center text-2xl font-bold text-[#002D74] mb-6">
            Sign Up
          </h2>
          {backendError && (
            <div className="text-red-500 text-sm text-center">{backendError}</div>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setBackendError("");
              axios
                .post("http://localhost:8000/auth/signup", values)
                .then((response) => {
                  navigate("/signin", { state: { success: response?.data?.message } });
                  resetForm();
                })
                .catch((error) => {
                  console.error("There was an error!", error);
                  if (error?.response && error?.response?.data && error.response?.data) {
                    setBackendError(error?.response?.data);
                  } else {
                    setBackendError("An unexpected error occurred. Please try again.");
                  }
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }}
          >
            {({ setFieldValue, errors, touched, setFieldTouched }) => (
              <Form className="flex flex-col gap-2 mt-4">
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 pr-1 mb-3 md:mb-0">
                    <label className="mb-1 font-medium text-black dark:text-white">
                      First Name
                    </label>
                    <Field
                      name="firstName"
                      type="text"
                      className="w-full rounded-lg border bg-white py-2 px-3 text-black outline-none focus-visible:shadow-none dark:text-white"
                      placeholder="Enter Your First Name"
                      onChange={(e) => {
                        let { value } = e.target;
                        value = value.replace(/[^a-zA-Z]/g, "").slice(0, 20);
                        setFieldValue(
                          "firstName",
                          capitalizeFirstLetter(value)
                        );
                      }}
                    />
                    {errors.firstName && touched.firstName ? (
                      <div className="text-red-500 text-sm">
                        {errors.firstName}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-full md:w-1/2 pl-1 ">
                    <label className="mb-1 font-medium text-black dark:text-whitee">
                      Last Name
                    </label>
                    <Field
                      name="lastName"
                      type="text"
                      className="w-full rounded-lg border bg-white py-2 px-3 text-black outline-none focus-visible:shadow-none dark:bg-form-input dark:text-white"
                      placeholder="Enter Your Last Name"
                      onChange={(e) => {
                        let { value } = e.target;
                        value = value.replace(/[^a-zA-Z]/g, "").slice(0, 20);
                        setFieldValue("lastName", capitalizeFirstLetter(value));
                      }}
                    />
                    {errors.lastName && touched.lastName ? (
                      <div className="text-red-500 text-sm">
                        {errors.lastName}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 pr-1 mb-3 md:mb-0">
                    <label className="mb-1 font-medium text-black dark:text-white">
                      Phone Number
                    </label>
                    <Field name="mobile_no">
                      {({ field, form }) => (
                        <CustomPhoneInput
                          customClassName="phone-input-two"
                          field={field}
                          form={form}
                          value={field.value}
                          onChange={(mobile_no) => {
                            setFieldValue("mobile_no", mobile_no);
                          }}
                          onBlur={() => {
                            setFieldTouched("mobile_no", true);
                          }}
                        />
                      )}
                    </Field>
                    {errors.mobile_no && touched.mobile_no ? (
                      <div className="text-red-500 text-sm">
                        {errors.mobile_no}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-full md:w-1/2 pl-1">
                    <label className="mb-1 font-medium text-black dark:text-white">
                      Date of Birth
                    </label>
                    <Field name="dob">
                      {() => (
                        <>
                          <DatePicker
                            placeholder="MM/DD/YYYY"
                            value={startDate}
                            onChange={(date) => {
                              setStartDate(date);
                              setFieldValue("dob", moment(date).format("MM/DD/YYYY"));
                            }}
                            onBlur={() => setFieldTouched("dob", true)}
                            format="MM/dd/yyyy"
                            placement="bottomStart"
                            shouldDisableDate={disableFutureDates}
                          />
                        </>
                      )}
                    </Field>
                    {errors.dob && touched.dob ? (
                      <div className="text-red-500 text-sm">{errors.dob}</div>
                    ) : null}
                  </div>
                </div>
                <div className="">
                  <label className="mb-1 font-medium text-black dark:text-white">
                    Email address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full rounded-lg border bg-white py-2 px-3 text-black outline-none focus-visible:shadow-none dark:text-white"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => {
                      const { value } = e.target;
                      const sanitizedValue = sanitizeEmail(value);
                      setFieldValue("email", toLowerCase(sanitizedValue));
                    }}
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  ) : null}
                </div>
                <div className="">
                  <label className="mb-1 font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="flex relative">
                    <Field
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      className="w-full rounded-lg border bg-white py-2 px-3 text-black outline-none focus-visible:shadow-none dark:text-white"
                      placeholder="Enter Your Password"
                      maxLength={15}
                    />
                    <button
                      type="button"
                      onClick={passwordVisibility}
                      className="text-gray-500 right-0 inset-y-2 pr-3 absolute focus:outline-none"
                    >
                      {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {errors.password && touched.password ? (
                    <div className="text-red-500 text-sm">
                      {errors.password}
                    </div>
                  ) : null}
                </div>
                <div className="">
                  <label className="mb-1 font-medium text-black dark:text-white">
                    Confirm Password
                  </label>
                  <div className="flex relative">
                    <Field
                      name="confirmPassword"
                      type={confPasswordVisible ? "text" : "password"}
                      className="w-full rounded-lg border bg-white py-2 px-3 text-black outline-none focus-visible:shadow-none dark:text-white"
                      placeholder="Enter Your Confirm Password"
                    />
                    <button
                      type="button"
                      onClick={confPasswordVisibility}
                      className="text-gray-500 right-0 inset-y-2 pr-3 absolute focus:outline-none"
                    >
                      {confPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </div>
                  ) : null}
                </div>
                <div className="my-2">
                  <button
                    type="submit"
                    className="bg-[#2a9042] w-full cursor-pointer rounded-lg border border-[#2a9042] p-2 text-white transition hover:bg-opacity-90 hover:scale-105 duration-300"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="text-[#002D74] text-center">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Sign In
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;