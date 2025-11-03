import React, { useState } from 'react'
import { setloginStatus } from "../../Redux/login/isLogin";
import { useDispatch } from 'react-redux';
import baseurl from '../../utils/baseurl';

import { useForm } from 'react-hook-form';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

const Auth = () => {
    const [isLoginPage, setisLoginPage] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [eyePassword, seteyePassword] = useState(false);
    const [eyeConfirmPassword, seteyeConfirmPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({/** resolver: yupResolver(schema), */ });
    const validateEmail = (email) => {
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            return "Invalid email format";
        };
    }
    const validatePassword = (password) => {
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':",.<>/?])(?!.*\s).{8,}$/g;
        // let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':",.<>/?])(?!.*\s)/g;
        if (!password.match(regex)) {
            return "invalid password format";
        };
    }

    const loginUser = async (obj) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(obj),
            redirect: 'follow',
            credentials: 'include' //!important
        };

        try {
            const response = await fetch(`${baseurl}/login`, requestOptions);
            const result = await response.json();
            if (result.status) {
                dispatch(setloginStatus(true));
                toast.success("Login success");
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            } else {
                toast.error("Invalid credentials");
                console.log('Error::Auth::loginUser::result', result.message)
            }
        } catch (error) {
            toast.error("Something went wrong! ty again");
            console.log('Error::Auth::loginUser', error)
        }
    }

    const registerUser = async (obj) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(obj),
            redirect: 'follow',
            credentials: 'include' //!important
        };

        try {
            const response = await fetch(`${baseurl}/register`, requestOptions)
            const result = await response.json();
            if (result.status) {
                toast.success("Registration success! Login to account");
                setisLoginPage(!isLoginPage);
            } else {
                toast.error("Something went wrong! ty again");
                console.log('Error::Auth::registerUser::result', result.message)
            }
        } catch (error) {
            toast.error("Something went wrong! ty again");
            console.log('Error::Auth::registerUser', error)
        }
    }

    const onSubmit = (data) => {
        console.log(data);
        if (data.btnOption === "REGISTER") {
            // register btn is clicked:
            if (data.password !== data.cpassword) {
                alert("Password and comfirm password DO Not match!");
                return false;
            }
            registerUser(data);
            return false;
        }
        // else login btn clicked:
        loginUser(data)
        return false;
    }
  return (
  <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
      <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
        {isLoginPage ? "Login into Account" : "Register Account"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off" noValidate>
        {/* Email */}
        <label
          className={`flex items-center gap-2 border rounded-lg px-3 py-2 transition-all ${
            errors.email
              ? "border-red-400 focus-within:ring-2 focus-within:ring-red-300"
              : "border-gray-300 focus-within:ring-2 focus-within:ring-purple-400"
          }`}
        >
          <EnvelopeIcon className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="grow bg-transparent outline-none text-gray-700"
            {...register("email", { validate: validateEmail })}
          />
        </label>
        {errors.email && (
          <p className="text-xs text-red-500 -mt-2">{errors.email.message}</p>
        )}

        {/* Password */}
        <label
          className={`flex items-center gap-2 border rounded-lg px-3 py-2 transition-all ${
            errors.password
              ? "border-red-400 focus-within:ring-2 focus-within:ring-red-300"
              : "border-gray-300 focus-within:ring-2 focus-within:ring-purple-400"
          }`}
        >
          <KeyIcon className="h-5 w-5 text-gray-500" />
          <input
            type={eyePassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="grow bg-transparent outline-none text-gray-700"
            {...register("password", { validate: validatePassword })}
          />
          {eyePassword ? (
            <EyeIcon
              className="h-5 w-5 text-gray-500 cursor-pointer"
              onClick={() => seteyePassword(!eyePassword)}
            />
          ) : (
            <EyeSlashIcon
              className="h-5 w-5 text-gray-500 cursor-pointer"
              onClick={() => seteyePassword(!eyePassword)}
            />
          )}
        </label>
        {errors.password && (
          <p className="text-xs text-red-500 -mt-2">{errors.password.message}</p>
        )}
        <p className="text-xs text-gray-500">
          Min 8 chars and must include Uppercase, Lowercase, Number and Special character.
        </p>

        {/* Confirm Password */}
        {!isLoginPage && (
          <>
            <label
              className={`flex items-center gap-2 border rounded-lg px-3 py-2 transition-all ${
                errors.cpassword
                  ? "border-red-400 focus-within:ring-2 focus-within:ring-red-300"
                  : "border-gray-300 focus-within:ring-2 focus-within:ring-purple-400"
              }`}
            >
              <KeyIcon className="h-5 w-5 text-gray-500" />
              <input
                type={eyeConfirmPassword ? "text" : "password"}
                name="cpassword"
                placeholder="Confirm Password"
                className="grow bg-transparent outline-none text-gray-700"
                {...register("cpassword", { validate: validatePassword })}
              />
              {eyeConfirmPassword ? (
                <EyeIcon
                  className="h-5 w-5 text-gray-500 cursor-pointer"
                  onClick={() => seteyeConfirmPassword(!eyeConfirmPassword)}
                />
              ) : (
                <EyeSlashIcon
                  className="h-5 w-5 text-gray-500 cursor-pointer"
                  onClick={() => seteyeConfirmPassword(!eyeConfirmPassword)}
                />
              )}
            </label>
            {errors.cpassword && (
              <p className="text-xs text-red-500 -mt-2">
                {errors.cpassword.message}
              </p>
            )}
          </>
        )}

        {/* Hidden Input */}
        <input
          type="hidden"
          name="btnOption"
          {...register("btnOption")}
          id="btnHiddenForm"
        />

        {/* Button */}
        {isLoginPage ? (
          <input
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg mt-4 transition-all shadow-sm cursor-pointer"
            value="Login"
            onClick={() => {
              reset({ btnOption: "LOGIN" });
            }}
          />
        ) : (
          <input
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg mt-4 transition-all shadow-sm cursor-pointer"
            value="Register"
            onClick={() => {
              reset({ btnOption: "REGISTER" });
            }}
          />
        )}
      </form>

      {/* Switch link */}
      <div className="text-center mt-6 text-sm text-gray-600">
        <h5 className="text-gray-500 mb-1">OR</h5>
        {isLoginPage ? (
          <p>
            Don’t have an account?{" "}
            <span
              className="text-purple-600 hover:underline cursor-pointer font-medium"
              onClick={() => setisLoginPage(false)}
            >
              Register
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              className="text-purple-600 hover:underline cursor-pointer font-medium"
              onClick={() => setisLoginPage(true)}
            >
              Login
            </span>
          </p>
        )}
      </div>

      <Toaster />
    </div>
  </main>
)}

export default Auth