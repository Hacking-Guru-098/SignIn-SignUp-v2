// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BottomWarning } from "../components/BottomWarning";
// import { Button } from "../components/Button";
// import { Heading } from "../components/Heading";
// import { InputBox } from "../components/InputBox";
// import { SubHeading } from "../components/SubHeading";
// import { CheckBox } from "../components/Checkbox";
// import { Alert } from "../components/Alert";
// import axios from "axios";
// import videoBG from "../assets/videoBG.mp4";
// import videoLeft from "../assets/videoBgLeft.mp4";
// import { FaEnvelope, FaPhone } from "react-icons/fa";

// export const Signup = () => {
// 	const [firstName, setFirstName] = useState("");
// 	const [lastName, setLastName] = useState("");
// 	const [username, setUsername] = useState("");
// 	const [phoneNumber, setPhoneNumber] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [passwordConfirmation, setPasswordConfirmation] = useState("");
// 	const [error, setError] = useState(null);
// 	const [isChecked, setIsChecked] = useState(false);
// 	const [signupMethod, setSignupMethod] = useState(null);
// 	const [otpInputVisible, setOtpInputVisible] = useState(false); // add this line

// 	const navigate = useNavigate();

// 	const handleCheckboxChange = () => {
// 		setIsChecked(!isChecked);
// 	};

// 	const handleSignupMethodChange = (method) => {
// 		setSignupMethod(method);
// 	};

// 	const handleSignup = async (e) => {
// 		e.preventDefault();
// 		if (!isChecked) {
// 			try {
// 				if (signupMethod === "email") {
// 					const response = await axios.post(
// 						"http://localhost:3000/api/v1/user/signup",
// 						{
// 							username,
// 							firstName,
// 							lastName,
// 							password,
// 							...(phoneNumber && { phoneNumber }), // add this line
// 						}
// 					);
// 					setOtpInputVisible(true); // add this line
// 					localStorage.setItem("token", response.data.token);
// 					navigate("/dashboard");
// 				} else if (signupMethod === "phone") {
// 					const response = await axios.post(
// 						"http://localhost:3000/api/v1/user/signup",
// 						{
// 							phoneNumber,
// 							firstName,
// 							lastName,
// 							password,
// 							...(username && { username }), // add this line
// 						}
// 					);
// 					localStorage.setItem("token", response.data.token);
// 					navigate("/dashboard");
// 				}
// 			} catch (error) {
// 				setError({
// 					message: error.response.data.message,
// 					severity: "danger",
// 				});
// 			}
// 		}
// 	};

// 	return (
// 		<div className='bg-slate-300 h-screen flex overflow-hidden'>
// 			<div className='relative w-1/2 h-full'>
// 				<video
// 					src={videoLeft}
// 					autoPlay
// 					loop
// 					muted
// 					alt='Illustration of the signup process'
// 					className='absolute top-0 left-0 w-full h-full object-cover'
// 				/>

// 				<div className='absolute top-0 left-0 w-full h-full flex justify-center items-center z-10'>
// 					<div className='flex flex-col justify-center'>
// 						<div
// 							className={`rounded-lg bg-${
// 								signupMethod === null ? "slate-800" : "white"
// 							} w-auto text-center p-2 h-max px-4`}
// 						>
// 							{signupMethod === null ? (
// 								<div>
// 									<div className='flex gap-4'>
// 										<FaEnvelope className='w-28 h-28 text-blue-400' />

// 										<Button
// 											label={"Sign up with Email"}
// 											onClick={() => handleSignupMethodChange("email")}
// 											className='mr-0'
// 										/>
// 									</div>

// 									<div className='flex gap-3'>
// 										<FaPhone className='w-28 h-28  text-blue-400' />

// 										<Button
// 											label={"Sign up with Phone Number"}
// 											onClick={() => handleSignupMethodChange("phone")}
// 											className='ml-0'
// 										/>
// 									</div>
// 								</div>
// 							) : (
// 								{otpInputVisible===false ?(

// 								<div>
// 									<Heading label={"TraderX"} />

// 									<SubHeading label={"The journey starts here..."} />

// 									<div className='flex'>
// 										<InputBox
// 											onChange={(e) => {
// 												setFirstName(e.target.value);
// 											}}
// 											placeholder='First Name'
// 											label={"First Name"}
// 											className='mr-4'
// 										/>

// 										<InputBox
// 											className='pl-4'
// 											onChange={(e) => {
// 												setLastName(e.target.value);
// 											}}
// 											placeholder='Last Name'
// 											label={"Last Name"}
// 										/>
// 									</div>

// 									{signupMethod === "email" ? (
// 										<div className='flex'>
// 											<InputBox
// 												onChange={(e) => {
// 													setUsername(e.target.value);
// 												}}
// 												placeholder='traderx@gmail.com'
// 												label={"Email"}
// 											/>
// 										</div>
// 									) : (
// 										<div className='flex flex-col align-middle'>
// 											<div className='flex'>
// 												<InputBox
// 													maxLength='10'
// 													type='number'
// 													onChange={(e) => {
// 														setPhoneNumber(e.target.value);
// 													}}
// 													placeholder='Phone Number'
// 													label={"Phone Number"}
// 													className='w-full flex-grow'
// 												/>
// 											</div>
// 										</div>
// 									)}

// 									<InputBox
// 										onChange={(e) => {
// 											setPassword(e.target.value);
// 										}}
// 										placeholder='Secure Password'
// 										label={"Password"}
// 										type='password'
// 									/>

// 									<InputBox
// 										onChange={(e) => {
// 											setPasswordConfirmation(e.target.value);
// 										}}
// 										placeholder='Secure Password'
// 										label={"Confirm Password"}
// 										type='password'
// 									/>

// 									<div className='mt-2'>
// 										<CheckBox
// 											label={
// 												"I agree to the Terms & Conditions and Privacy Policy."
// 											}
// 											onChange={handleCheckboxChange}
// 										/>
// 									</div>

// 									<div className='pt-4'>
// 										<Button
// 											onClick={handleSignup}
// 											label={"Sign up"}
// 											disabled={!isChecked || password !== passwordConfirmation}
// 											className={`${
// 												!isChecked || password !== passwordConfirmation
// 													? "cursor-not-allowed pointer-events-none group-hover:cursor-pointer group-hover:pointer-events-auto"
// 													: ""
// 											}`}
// 										/>
// 									</div>

// 									{error && (
// 										<Alert
// 											message={error.message}
// 											type={error.type}
// 											onClose={() => setError(null)}
// 										/>
// 									)}

// 									<BottomWarning
// 										label={"Already have an account?"}
// 										buttonText={"Sign in"}
// 										to={"/signin"}
// 									/>
// 								</div>
// 								):(
// 									<div>
// 										<InputBox
// 										onChange={(e) => {
// 											setOtp(e.target.value);
// 										}}
// 										placeholder='OTP'
// 										label={"One Time Verification"}
// 										type='password'
// 									/>
// 									<Button/>
// 											// onClick={handleSignup}
// 											// label={"Sign up"}
// 									</div>
// 							))}
// 							)}
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			<div className='w-1/2 h-full'>
// 				<video
// 					src={videoBG}
// 					autoPlay
// 					loop
// 					muted
// 					alt='Illustration of the signup process'
// 					className=' m-0 p-0 w-full h-full object-cover'
// 				/>
// 			</div>
// 		</div>
		
// 	);
// };
 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { CheckBox } from "../components/Checkbox";
import { Alert } from "../components/Alert";
import axios from "axios";
// import OtpInput from "otp-input-react";
import videoBG from "../assets/videoBG.mp4";
import videoLeft from "../assets/videoBgLeft.mp4";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import {OTPInput} from "../components/OTPInput"

export const Signup = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [error, setError] = useState(null);
	const [isChecked, setIsChecked] = useState(false);
	const [signupMethod, setSignupMethod] = useState(null);
	const [otpInputVisible, setOtpInputVisible] = useState(false);
	const [otp, setOtp] = useState("");

	const navigate = useNavigate();

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const handleSignupMethodChange = (method) => {
		setSignupMethod(method);
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		if (!isChecked) {
			try {
				if (signupMethod === "email") {
					const response = await axios.post(
						"http://localhost:3000/api/v1/user/signup",
						{
							username,
							firstName,
							lastName,
							password,
							...(phoneNumber && { phoneNumber }), // add this line
						}
					);
					setOtpInputVisible(true); // add this line
					localStorage.setItem("token", response.data.token);
					// navigate("/dashboard");
				} else if (signupMethod === "phone") {
					const response = await axios.post(
						"http://localhost:3000/api/v1/user/signup",
						{
							phoneNumber,
							firstName,
							lastName,
							password,
							...(username && { username }), // add this line
						}
					);
					localStorage.setItem("token", response.data.token);
					// navigate("/dashboard");
				}
			} catch (error) {
				setError({
					message: error.response.data.message,
					severity: "danger",
				});
			}
		} else {
			// Handle OTP verification
			// ...
		}
	};

	return (
		<div className='bg-slate-300 h-screen flex overflow-hidden'>
			<div className='relative w-1/2 h-full'>
				<video
					src={videoLeft}
					autoPlay
					loop
					muted
					alt='Illustration of the signup process'
					className='absolute top-0 left-0 w-full h-full object-cover'
				/>

				<div className='absolute top-0 left-0 w-full h-full flex justify-center items-center z-10'>
					<div className='flex flex-col justify-center'>
						<div
							className={`rounded-lg bg-${
								signupMethod === null ? "slate-800" : "white"
							} w-auto text-center p-2 h-max px-4`}
						>
							{signupMethod === null ? (
								<div>
									<div className='flex gap-4'>
										<FaEnvelope className='w-28 h-28 text-blue-400' />

										<Button
											label={"Sign up with Email"}
											onClick={() => handleSignupMethodChange("email")}
											className='mr-0'
										/>
									</div>

									<div className='flex gap-3'>
										<FaPhone className='w-28 h-28  text-blue-400' />

										<Button
											label={"Sign up with Phone Number"}
											onClick={() => handleSignupMethodChange("phone")}
											className='ml-0'
										/>
									</div>
								</div>
							) : (
								<div>
									{otpInputVisible === false ? (
										<div>
											<Heading label={"TraderX"} />

											<SubHeading label={"The journey starts here..."} />

											<div className='flex'>
												<InputBox
													onChange={(e) => {
														setFirstName(e.target.value);
													}}
													placeholder='First Name'
													label={"First Name"}
													className='mr-4'
												/>

												<InputBox
													className='pl-4'
													onChange={(e) => {
														setLastName(e.target.value);
													}}
													placeholder='Last Name'
													label={"Last Name"}
												/>
											</div>

											{signupMethod === "email" ? (
												<div className='flex'>
													<InputBox
														onChange={(e) => {
															setUsername(e.target.value);
														}}
														placeholder='traderx@gmail.com'
														label={"Email"}
														className='w-full'
													/>
												</div>
											) : (
												<div className='flex flex-col align-middle'>
													<div className='flex'>
														<InputBox
															maxLength='10'
															type='number'
															onChange={(e) => {
																setPhoneNumber(e.target.value);
															}}
															placeholder='Phone Number'
															label={"Phone Number"}
															className='w-full flex-grow'
														/>
													</div>
												</div>
											)}

											<InputBox
												onChange={(e) => {
													setPassword(e.target.value);
												}}
												placeholder='Secure Password'
												label={"Password"}
												type='password'
												className='w-full'
											/>

											<div className='mt-2'>
												//{" "}
												<CheckBox
													label={
														"I agree to the Terms & Conditions and Privacy Policy."
													}
													onChange={handleCheckboxChange}
												/>
											</div>

											<div className='pt-4'>
												<Button
													onClick={handleSignup}
													label={"Sign up"}
													disabled={
														!isChecked || password !== passwordConfirmation
													}
													className={`${
														!isChecked || password !== passwordConfirmation
															? "cursor-not-allowed pointer-events-none group-hover:cursor-pointer group-hover:pointer-events-auto"
															: ""
													}`}
												/>
											</div>

											{error && (
												<Alert
													message={error.message}
													type={error.type}
													onClose={() => setError(null)}
												/>
											)}

											<BottomWarning
												label={"Already have an account?"}
												buttonText={"Sign in"}
												to={"/signin"}
											/>

											<p className='mt-4 text-red-600'>
												{error && "All fields are required."}
											</p>
										</div>
									) : (
										<div>
											<p className='text-center mt-4'>
												An OTP has been sent to your registered email or phone
												number.
											</p>

											<div className='mt-4'>
												<InputBox placeholder='OTP'
												label={"OTP"}
												type='password'
												className='w-full'/>
											</div>

											<Button
												label={"Verify OTP"}
												onClick={() => {
													verifyOtp(otp);
												}}
												className='w-full mt-4'
											/>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className='w-1/2 h-full'>
				<video
					src={videoBG}
					autoPlay
					loop
					muted
					alt='Illustration of the signup process'
					className=' m-0 p-0 w-full h-full object-cover'
				/>
			</div>
		</div>
	);
};