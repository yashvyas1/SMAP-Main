import axios from "axios";
import { Field, Form, Formik } from "formik";
import { PhoneNumberUtil } from "google-libphonenumber";
import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import * as Yup from "yup";
import useModal from "../hooks/useModal";

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

// Yup validation schema for the forget password form
const ForgotPasswordSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Phone Number is required")
    .test("is-valid-phone", "Phone Number is invalid", (value) =>
      value ? isPhoneValid(value) : true
    ),
  email: Yup.string()
    .trim()
    .lowercase()
    .matches(
      /^[a-z0-9]+(?:[._%+-]?[a-z0-9]+)*@[a-z0-9]+(?:\.[a-z0-9]+)+$/,
      "Invalid Email Id"
    )
    .required("Email Id is required"),
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
      onChange={(phone) => {
        onChange(phone);
        setFieldValue(field.name, phone);
      }}
      onBlur={(e) => {
        onBlur(e);
        setFieldTouched(field.name, true);
      }}
    />
  );
};

const ForgetPasswordModal = () => {
  const [backendError, setBackendError] = useState("");
  const { openModal } = useModal();

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

  const initialValues = {
    phone: "",
    email: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setBackendError("");
    try {
      const response = await axios.post("/api/forgot-password", {
        phone: values.phone,
        email: values.email,
      });
      if (response.data.success) {
        openModal("OTPVerificationModal");
        resetForm();
      } else {
        setBackendError(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error during OTP send:", error);
      setBackendError(error.response?.data?.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-[41rem] h-[31rem] px-10 pt-16">
      <h2 className="text-3xl font-inter font-medium text-[#333333] px-10">
        Forgot Your Password
      </h2>
      {backendError && (
        <div className="text-red-500 text-sm text-center">{backendError}</div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={ForgotPasswordSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched, setFieldTouched }) => (
          <Form className="px-10">
            <div className="mt-4">
              <label className="mb-1 text-[#666666] font-inter font-normal text-base">
                Phone Number
              </label>
              <Field name="phone">
                {({ field, form }) => (
                  <CustomPhoneInput
                    customClassName="mt-1 bg-[#CBD5E1]/30 border border-[#666666]/35 rounded-xl focus:outline-none phone-input-one placeholder-black"
                    {...field}
                    defaultCountry="in"
                    field={field}
                    form={form}
                    value={field.value}
                    onChange={(phone) => {
                      setFieldValue("phone", phone);
                    }}
                    onBlur={() => {
                      setFieldTouched("phone", true);
                    }}
                  />
                )}
              </Field>
              {errors.phone && touched.phone ? (
                <div className="text-red-500 text-base">{errors.phone}</div>
              ) : null}
            </div>
            <div className="mt-4">
              <label className="mb-1 text-[#666666] font-inter font-normal text-base">
                Email Id
              </label>
              <Field
                name="email"
                type="email"
                className="w-full h-14 px-3 py-2 mt-1 bg-[#CBD5E1]/30 border border-[#666666]/35 rounded-xl focus:outline-none placeholder-black"
                placeholder="Enter Email Id"
                onChange={(e) => {
                  const { value } = e.target;
                  const sanitizedValue = sanitizeEmail(value);
                  setFieldValue("email", toLowerCase(sanitizedValue));
                }}
              />
              {touched.email && errors.email ? (
                <div className="text-red-500 text-base">{errors.email}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full h-20 px-4 py-2 text-white bg-[#0D4896] font-inter font-medium text-2xl rounded-lg focus:outline-none mt-10"
            >
              Send OTP
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgetPasswordModal;
