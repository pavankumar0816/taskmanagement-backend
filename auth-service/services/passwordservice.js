// **Password Handling (bcrypt)
// Passwords are securely hashed before storing in the database and compared during login.

const bcrypt = require("bcryptjs")

// hash password
const hashPassword = async(plain) => {
   return await bcrypt.hash(plain,10);
}

// compare password
const comparePassword = async (plain, hash) => {
    return await bcrypt.compare(plain, hash);
};

module.exports = {hashPassword, comparePassword};

