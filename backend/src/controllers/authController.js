// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const login = async (req, res) => {
//     const { email, password, role } = req.body;
//     try {
//         const user = await User.findByEmail(email);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // const isMatch = await bcrypt.compare(password, user.password_hash); 
//         // if (!isMatch) {
//         //     return res.status(401).json({ message: "Invalid credentials" });
//         // }

//         // console.log(password);

//         const isMatchPassword = user.password === password; 
//         const isMatchRole = user.user_type === role;
//         if (!isMatchPassword) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         } else if (!isMatchRole) {
//             return res.status(401).json({ message: "Incorrect role" });
//         }

//         const token = jwt.sign(
//             { id: user.id, email: user.email, role: user.user_type }, 
//             process.env.JWT_SECRET, 
//             { expiresIn: 3600 }
//         );

//         res.status(200).json({
//             message: "Login successful",
//             token,
//             expiresIn: 3600,
//             user: {
//                 id: user.user_id,
//                 email: user.email,
//                 role: user.user_type
//             }
//         });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// module.exports = {
//     login
// };

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Assume password hashing is implemented during user creation
        const isMatch = user.password === password;
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (user.user_type !== role) {
            return res.status(401).json({ message: "Incorrect role" });
        }

        const token = jwt.sign(
            { id: user.user_id, email: user.email, role: user.user_type },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            expiresIn: 3600,
            user: {
                id: user.user_id,
                email: user.email,
                role: user.user_type
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    login
};