import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import PosterImage from "../assets/images/poster-img.png";
import useModal from "../hooks/useModal";
import CryptoJS from "crypto-js";
import { LoginSocialFacebook } from "reactjs-social-login";
import Modal from "../components/common/Modal";
import Cookies from "js-cookie";

// Schema for signin form validation using Yup
const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
const FB_REDIRECT_URI = process.env.REACT_APP_FB_REDIRECT_URI;
const FB_APP_SECRET = process.env.REACT_APP_FACEBOOK_APP_SECRET;

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [backendError, setBackendError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useModal();
  const [check, setCheck] = useState(false);
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user/dashboard", { replace: true });
    }

    const storedEmail = localStorage.getItem("email");
    const encryptedPassword = localStorage.getItem("password");

    if (storedEmail && encryptedPassword) {
      const decryptedPassword = CryptoJS.AES.decrypt(
        encryptedPassword,
        SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
      setInitialValues({ email: storedEmail, password: decryptedPassword });
      setCheck(true);
    }

    if (location.state?.success) {
      toast.success(location.state?.success);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  const passwordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCheck = () => {
    setCheck(!check);
  };

  async function getLongLivedUserToken(shortLivedToken) {
    try {
      const response = await axios.get(
        "https://graph.facebook.com/v17.0/oauth/access_token",
        {
          params: {
            grant_type: "fb_exchange_token",
            client_id: FB_APP_ID,
            client_secret: FB_APP_SECRET,
            fb_exchange_token: shortLivedToken,
          },
        }
      );
      const longLivedToken = response.data.access_token;
      return longLivedToken;
    } catch (error) {
      console.error("Error exchanging token:", error.response.data);
      throw error;
    }
  }

  const handleFacebookLogin = (provider, data) => {
    let access_token = data?.accessToken;
    axios
      .get(
        `https://graph.facebook.com/me/accounts?access_token=${access_token}`
      )
      .then(async (response) => {
        const pages = response?.data?.data;
        access_token = await getLongLivedUserToken(access_token);
        const modalData = {
          provider,
          access_token,
          pages,
        };
        openModal("PageModal", { data: modalData });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex h-screen flex-col md:flex-row items-center justify-center p-4 bg-[#d1daff] w-full rounded-lg shadow-lg">
      <ToastContainer
        position="bottom-right"
        closeOnClick
        theme="light"
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
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
            Sign In
          </h2>
          {backendError && (
            <div className="text-red-500 text-sm text-center">
              {backendError}
            </div>
          )}
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={SigninSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setBackendError("");
              axios
                .post("http://localhost:8000/auth/signin", values)
                .then(async (response) => {
                  const user = response?.data?.user;
                  const facebookUserDetails = response?.data?.facebook;
                  const userDetailsCookie = await Cookies.get("userDetails");
                  const userDetails = userDetailsCookie
                    ? JSON.parse(userDetailsCookie)
                    : {};
                  Cookies.remove("userDetails");
                  const filteredUserDetails = {
                    ...userDetails,
                    first_name: user?.first_name,
                    loginType: user?.loginType,
                    facebook: user?.facebook,
                    facebookUserName: facebookUserDetails?.username,
                    facebookUserPicture: facebookUserDetails?.user_picture,
                    youtube: user?.youtube,
                    instagram: user?.instagram,
                    linkedin: user?.linkedin,
                    twitter: user?.twitter,
                  };
                  await Cookies.set(
                    "userDetails",
                    JSON.stringify(filteredUserDetails)
                  );
                  if (check) {
                    localStorage.setItem("email", values.email);
                    const encryptedPassword = CryptoJS.AES.encrypt(
                      values.password,
                      SECRET_KEY
                    ).toString();
                    localStorage.setItem("password", encryptedPassword);
                  } else {
                    localStorage.removeItem("email");
                    localStorage.removeItem("password");
                  }
                  localStorage.setItem("token", response?.data?.token);
                  localStorage.setItem(
                    "jwtExpiryTimeInMilliseconds",
                    response?.data?.jwtExpiryTimeInMilliseconds
                  );
                  navigate("/user/dashboard", {
                    state: { success: response?.data?.message },
                  });
                  resetForm();
                })
                .catch((error) => {
                  console.error("There was an error!", error);
                  if (error?.response && error?.response.data) {
                    setBackendError(error?.response?.data);
                    if (error?.response?.data?.message) {
                      toast.error(error?.response?.data?.message);
                    }
                  } else {
                    setBackendError(
                      "An unexpected error occurred. Please try again."
                    );
                    toast.error(
                      "An unexpected error occurred. Please try again."
                    );
                  }
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label className="mb-1 block font-medium text-black dark:text-white">
                    Email address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full rounded-lg border bg-white py-2 px-3 text-black outline-none focus-visible:shadow-none dark:text-white"
                    placeholder="Enter Your Email Address"
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label className="mb-1 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
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
                      className="absolute right-4 top-4"
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={check}
                      onChange={handleCheck}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="block ml-2 text-md text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <button
                      type="button"
                      onClick={() => openModal("ForgetPasswordModal")}
                      className="font-semibold text-indigo-600 hover:text-indigo-500 bg-transparent border-0 p-0 cursor-pointer"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </div>
                <div className="my-4">
                  <button
                    type="submit"
                    className="bg-[#2a9042] w-full cursor-pointer rounded-lg border border-[#2a9042] p-2 text-white transition hover:bg-opacity-90 hover:scale-105 duration-300"
                  >
                    Sign In
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div>
            <div className="text-[#002D74] mt-4 text-center">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Sign Up
              </Link>
            </div>
            <div className="text-center my-1">
              <p className="text-zinc-500 font-semibold">
                or you can sign in with
              </p>
              <div className="flex gap-2 justify-center my-4">
                <LoginSocialFacebook
                  appId={FB_APP_ID}
                  redirectUri={FB_REDIRECT_URI}
                  scope="email,public_profile,pages_show_list,pages_read_engagement,pages_manage_metadata"
                  onLoginSuccess={handleFacebookLogin}
                  onResolve={({ provider, data }) => {
                    handleFacebookLogin(provider, data);
                  }}
                  onReject={(err) => {
                    console.error(err);
                    navigate("/signin");
                  }}
                  onLoginError={(error) => console.error("Login error:", error)}
                >
                  <FaFacebook className="text-blue-500 hover:text-blue-700 w-8 h-8" />
                </LoginSocialFacebook>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default SignIn;
