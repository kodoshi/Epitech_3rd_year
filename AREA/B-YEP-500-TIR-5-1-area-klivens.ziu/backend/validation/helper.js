const dotenv = require("dotenv");
dotenv.config();

/**
 * User Signup Validator method, checks 1 more time the minimum requirements needed to register
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @param {object} next allows the method to go to the next middleware
 */
exports.userSignupValidator = (req, res, next) => {
    req.check("name", "Insert Name").notEmpty();
    req.check("name", "Name length limited between 3 & 50 characters").isLength({
      min: 3,
      max: 50,
    });
  
    req
      .check("email", "Insert Email between 3 & 150 characters")
      .matches(/.+\@.+\..+/)
      .withMessage("Email should be in the right format")
      .isLength({
        min: 3,
        max: 150,
      });
  
    req.check("password", "Insert Password").notEmpty();
    req
      .check("password")
      .isLength({ min: 6 })
      .withMessage("Password must contain at least 6 characters and a number")
      .matches(/\d/)
      .withMessage("Password must contain at least 6 characters and a number");
  
    //extra error checking
    const errors = req.validationErrors();
    if (errors) {
      const firstError = errors.map((err) => err.msg)[0]; //first error instance gets logged
      return res.status(401).json({ error: firstError });
    }
  
    next(); //so we dont get stuck
  };

  /**
 * Password reset validate method, checks regex
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @param {object} next allows the method to go to the next middleware
 */
  exports.passwordResetValidator = (req, res, next) => {
    // check for password
    req.check("newPassword", "Password is required").notEmpty();
    req.check("newPassword")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars long")
        .matches(/\d/)
        .withMessage("must contain a number")
        .withMessage("Password must contain a number");

    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware or ...
    next();
};

const nodeMailer = require("nodemailer");
const defaultEmailData = { from: "noreply@area.com" };

exports.sendEmail = emailData => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.GMAIL_IMAP_USER,
            pass: process.env.GMAIL_IMAP_PASSW
        }
    });
    return (
        transporter
            .sendMail(emailData)
            .then(info => console.log(`Message sent: ${info.response}`))
            .catch(err => console.log(`Problem sending email: ${err}`))
    );
};
