const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const router = express.Router();

const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false, // Use `true` for port 465, `false` for all other ports
	auth: {
		user: "deepama35@gmail.com",
		pass: "yhgz xywd wtxx lrfq",
	},
});

const signUpSchema = zod.object({
	firstName: zod
		.string()
		.min(2, { message: "First name must be at least 2 characters long" }),
	lastName: zod
		.string()
		.min(2, { message: "Last name must be at least 2 characters long" }),
	password: zod
		.string()
		.min(8, { message: "Password must be 8 or more characters long" })
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
			message:
				"Password must contain at least one uppercase letter, one lowercase letter, and one number",
		}),
	username: zod.string().email("Invalid email").optional(),
	phoneNumber: zod
		.string()
		.min(10, { message: "Enter correct Mobile number" })
		.optional(),
});

router.post("/signup", async (req, res, next) => {
	const body = req.body;
	const { success, error } = signUpSchema.safeParse(body);

	if (!success) {
		return res.status(400).json({
			message: error.errors[0].message,
		});
	}

	let existingUser;

	if (body.username) {
		existingUser = await User.findOne({ username: body.username });
	} else if (body.phoneNumber) {
		existingUser = await User.findOne({ phoneNumber: body.phoneNumber });
	}

	if (existingUser) {
		return res.status(409).json({
			message: "Username, email or phone number already taken",
		});
	}

	const user = await User.create({
		username: body.username,
		password: body.password,
		firstName: body.firstName,
		lastName: body.lastName,
		phoneNumber: body.phoneNumber,
	});

	const userId = user._id;

	const otp = Math.floor(Math.random() * 100000);
	user.otp = otp;
	user.otpExpiresAt = Date.now() + 300000; // 5 minutes

	await user.save();

	const info = await transporter.sendMail({
		from: '"TraderX Co 👻" <deepama35@gmail.com>', // sender address
		to: body.username, // list of receivers
		subject: "OTP Verification ✔", // Subject line
		text: `Your OTP is ${otp}`, // plain text body
		html: `<b>Your OTP is ${otp}</b>`, // html body
	});

	console.log("Message sent: %s", info.messageId);

	res.json({
		message: "User created successfully. Please verify your email",
	});
});

router.post("/verify/otp", async (req, res) => {
	try {
		const { username, otp } = req.body;
		if (!username || !otp)
			return res.status(401).send({ message: "Enter Valid Mail and OTP" });
		const user = await User.findOne({ username });
		if (!user) return res.status(404).send({ message: "User not found" });
		if (user.otp !== otp)
			return res.status(401).send({ message: "Invalid OTP" });
		if (user.otpExpiresAt < Date.now())
			return res.status(401).send({ message: "OTP has expired" });
		user.otpVerified = true;
		await user.save();
		res.json({
			message: "OTP verified successfully",
		});
	} catch (error) {
		res.status(500).send({
			error: error.message,
			message: "Server error:",
		});
		console.log(error);
	}
});

router.post("/signin", async (req, res, next) => {
	const body = req.body;
	const { success } = signInSchema.safeParse(body);

	if (!success) {
		return res.status(400).json({
			message: "Incorrect inputs",
		});
	}

	const user = await User.findOne({
		username: req.body.username,
		password: req.body.password,
	});

	if (user) {
		if (!user.otpVerified) {
			return res.status(401).json({
				message: "Please verify your email first",
			});
		}
		const token = jwt.sign(
			{
				userId: user._id,
			},
			JWT_SECRET
		);

		res.json({
			token: token,
		});
		return;
	}

	res.status(401).json({
		message: "Error while logging in",
	});
});

module.exports = router;
