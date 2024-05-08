import { User } from "../models/UserSchema.js";
import ErrorHandler from "../error/error.js";

export const CreateUser = async (req, res, next) => {
    try {
        const { UserName, FirstName, LastName, Password, email, PhoneNo, Grounds } = req.body;

        if (!FirstName || !LastName || !email || !Password || !PhoneNo || !UserName) {
            return next(new ErrorHandler("Please Fill Complete Form!", 400));
        }

        const existingUsername = await User.findOne({ UserName });
        if (existingUsername) {
            return next(new ErrorHandler("User Already Exist!", 400));
        }

        
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return next(new ErrorHandler("Email Already In Use!", 400));
        }
        const existingPhoneNO = await User.findOne({ PhoneNo });
        if (existingPhoneNO) {
            return next(new ErrorHandler("Phone No. Already In Use!", 400));
        }

        await User.create({ FirstName, UserName, LastName, email, Password, PhoneNo, Grounds });

        res.status(201).json({
            success: true,
            message: "Account Created!",
        });
    } catch (error) {
        // Handle Mongoose validation errors and other errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return next(new ErrorHandler(validationErrors.join(', '), 400));
        }
        // Handle other errors
        return next(error);
    }
};

export const FindUser = async (req, res, next) => {
  try {
    const { UserName, Password } = req.body;

    if (!UserName || !Password) {
      return next(new ErrorHandler("Please provide both username and password!", 400));
    }

    const existingUser = await User.findOne({ UserName });

    if (!existingUser) {
      return next(new ErrorHandler("User doesn't exist!", 404));
    }

    // Verify the password
    // const isPasswordValid = await existingUser.comparePassword(Password);
    if (existingUser.Password!==Password) {
      return next(new ErrorHandler("Incorrect password!", 401));
    }

    // Generate a token or session for the authenticated user
    // const token = generateAuthToken(existingUser); // You need to implement generateAuthToken function

    // Return success response with token
    res.status(200).json({
      success: true,
      message: "Login successful!",
    
    });
  } catch (error) {
    // Handle Mongoose validation errors and other errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }
    // Handle other errors
    return next(error);
  }
};

