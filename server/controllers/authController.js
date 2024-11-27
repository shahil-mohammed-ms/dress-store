const User = require("../models/user");
const Otp = require('../models/otp')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

module.exports.signup = async (req, res) => {
  const { name, password, email, phone } = req?.body;
  console.log(req?.body)
  const otp = generateOTP();
  const otpExpiryTime = new Date(Date.now() + 5 * 60 * 1000); // Current time + 5 minutes

  try {
    const checkUser = await User.findOne({ email });
    console.log('chk user',checkUser)
    //hashing password
    const encryptedPassword = await bcrypt.hash(password, 10);

    if (checkUser) {
      if (checkUser.is_verified) {
        return res.status(409).json({
          message: 'Email already present',
          data: { proceed: false },
        });
      } else {
        // User exists but is not verified; resend OTP and update expiry
        checkUser.name=name;
        checkUser.email=email;
        checkUser.password=encryptedPassword;
        checkUser.otp = otp;
        checkUser.otpExpiry = otpExpiryTime;
        await checkUser.save();

        transporter.sendMail({
          from: 'shahilmohammed7@gmail.com',
          to: email,
          subject: 'Your OTP for verification',
          text: `Your OTP is: ${otp}`,
        }, (error, info) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Failed to resend OTP' });
          } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ 
              message: 'OTP resent successfully', 
              data: { proceed: true },
            });
          }
        });
        return; // Exit after resending OTP
      }
    }

    // New user signup flow
    
    const newUser = new User({
      name,
      password: encryptedPassword,
      email,
      otp,
      otpExpiry: otpExpiryTime,
    });

    await newUser.save();

    // Send email with OTP
    transporter.sendMail({
      from: 'shahilmohammed7@gmail.com',
      to: email,
      subject: 'Your OTP for verification',
      text: `Your OTP is: ${otp}`,
    }, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Failed to send OTP' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({
          message: 'Registration successful, OTP sent',
          data: { proceed: true },
        });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      message: error?.message ?? 'Something went wrong' 
    });
  }
};

function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: 'numeric'
  });
}

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shahilmohammed7@gmail.com',
    pass: 'ayeb hyaq ymta waih'
  }
});




//verify signup otp along with jwt
module.exports.verifyOtp = async (req, res) => {
  const otp = req?.body?.otp;
  const email = req?.body?.email;
console.log('reqqq',req.body)
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (user) {
      // Check if OTP matches and hasn't expired
      const currentTime = new Date();
      if (
        user?.otp === otp &&
        user?.otpExpiry &&
        new Date(user.otpExpiry) > currentTime
      ) {
        // Mark the user as verified
        user.is_verified = true;
        user.otp = null; // Clear OTP after successful verification
        user.otpExpiry = null; // Clear OTP expiry after successful verification
        await user.save();

        //add jwt code
            // Generate the access token
    const accessToken = jwt.sign(
      { _id: existingUser._id },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRY,
      }
    );

    // Generate the refresh token
    const refreshToken = jwt.sign(
      { _id: existingUser._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRY,
      }
    );

        return res.status(200).json(
          { 
          message: 'OTP verified successfully!',
          data:{proceed:true,
          token: { accessToken, refreshToken },
          existingUser:user} 
         }
      );
      } else {
        return res
          .status(400)
          .json({ message: 'Invalid OTP or OTP has expired.',data:{proceed:false} });
      }
    } else {
      return res.status(404).json({ message: 'User not found.',data:{proceed:false} });
    }
  } catch (error) {
    console.error('Error during OTP verification:', error);
    return res.status(500).json({ message: 'Internal Server Error.',data:{proceed:false} });
  }
};

module.exports.changePassword=async(req,res)=>{
  const email = req?.body.email
  const newPassword = req?.body.newPassword
console.log(email ,'',newPassword)

  const encryptedPassword = await bcrypt.hash(newPassword, 10);
try {
  const user = await User.findOne({ email });
  user.password = encryptedPassword;
  await user.save();

    res.status(200).json({ message: 'Password updated successfully' });

} catch (error) {
  console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal Server Error' });
}


}

// module.exports.signin = async (req, res) => {
//    const { email, password } = req.body;
//    console.log('req',req.body)

//    try {
//       const pipeline = [
//          {
//             $match: {
//                $or: [
//                   { username: email },
//                   { email: email },
//                   { phone: email },
//                ],
//             },
//          },
//          {
//             $project: {
//                _id: 1,
//                username: 1,
//                email: 1,
//                phone: 1,
//                password: 1,
//                is_admin: 1,
//                is_verified: 1,
//                profile: 1,
//                cart: 1,
//                wishlist: 1,
//                wallet: 1,
//             },
//          },
//       ];

//       await userSchema
//          .aggregate(pipeline)
//          .exec()
//          .then((users) => {
//             if (users.length === 0) {
//                console.log("User not found");
//                return res.status(404).json({ message: "user not found" })
//             } else {
//                const user = users[0];
//                bcrypt.compare(password, user.password, (err, result) => {
//                   if (err) {
//                      console.error("Password comparison error:", err);
//                      return res.status(500).json({ message: err?.message })
//                   } else if (result) {
//                      const accessToken = jwt.sign(
//                         { _id: user._id },
//                         process.env.JWT_ACCESS_SECRET,
//                         {
//                            expiresIn: process.env.JWT_ACCESS_EXPIRY,
//                         }
//                      );

//                      const refreshToken = jwt.sign(
//                         { _id: user._id },
//                         process.env.JWT_REFRESH_SECRET,
//                         {
//                            expiresIn: process.env.JWT_REFRESH_EXPIRY,
//                         }
//                      );
//                      delete user.password;
//                      return res.status(200).json({
//                         message: "login successfull",
//                         data: { token: { accessToken, refreshToken }, user }
//                      });
//                   } else {
//                      console.log(result);
//                      console.log("Incorrect password");
//                      return res.status(404).json({ message: "Incorrect password" })
//                   }
//                });
//             }
//          });
//    } catch (error) {
//       return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
//    }
// };

module.exports.signin = async (req, res) => {
  const { password, email } = req.body;
  try {
    // Find the user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "Email not found" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Generate the access token
    const accessToken = jwt.sign(
      { _id: existingUser._id },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRY,
      }
    );

    // Generate the refresh token
    const refreshToken = jwt.sign(
      { _id: existingUser._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRY,
      }
    );

    // Respond with the user data and tokens
    res.status(200).json({
      
      data: {proceed: true, token: { accessToken, refreshToken }, existingUser },
      message: "Login successful",
    });
  } catch (error) {
    console.log("Error during sign-in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getCurrentUser = async (req, res) => {
  try {
    const _id = req.decoded._id;
    console.log("idd,", _id);
    const currentUser = await User.findOne({ _id });
    console.log("crnt user ", currentUser);
    if (!currentUser) {
      return res.status(400).json({ message: "user does not exists" });
    }
    return res
      .status(200)
      .json({
        data: currentUser,
        message: "user details fetched successfully",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: err?.message ?? "Something went wrong" });
  }
};
