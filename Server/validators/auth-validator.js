const { z } = require("zod");

// Creating an object schema
const signupSchema = z.object({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least three characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least three characters" })
        .max(255, { message: "Email must not be more than 255 characters" }),

    phone: z
        .string({ required_error: "Phone Number is required" })
        .trim()
        .min(10, { message: "Phone Number must be at least 10 characters" })
        .max(10, { message: "Phone Number must not be more than 10 characters" }),

    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(7, { message: "Password must be at least 7 characters" })
        .max(1024, { message: "Password must not be more than 1024 characters" }),
});


// Creating a login schema
const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .max(255, { message: "Email must not be more than 255 characters" }),

    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(7, { message: "Password must be at least 7 characters" })
        .max(1024, { message: "Password must not be more than 1024 characters" }),
});

module.exports = { signupSchema, loginSchema };