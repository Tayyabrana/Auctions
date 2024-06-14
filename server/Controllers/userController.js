const User = require("../Models/userModel");
const middleware = require("../middleware");

const Register = async (req, res) => {
    try {
        const { name, email, contact, age, gender, password, role } = req.body;
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send("A user with that email has already been registered!");
        } else {
            let passwordDigest = await middleware.hashPassword(password);
            const userData = await User.create({
                name,
                email,
                contact,
                age,
                gender,
                password: passwordDigest,
                role
            });
            res.status(201).json({ userData });
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Invalid data');
        }
        const user = await User.findOne({ email });
        if (user) {
            let passwordMatched = await middleware.comparePassword(
                user.password,
                password
            );
            if (passwordMatched) {
                let payload = {
                    id: user.id,
                };
                let token = middleware.createToken(payload);
                return res.status(200).json({ token });
            }
        }
        res.status(401).send('Invalid Credentials!');
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const Role = async (req, res) => {
    try {
        const id = res.locals.payload.id;
        const user = await User.findById(id);
        if (user) {
            return res.status(200).json({ message: "Fetched Successfully", role: user.role })
        }
        res.status(401).send('Invalid Credentials!');
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

module.exports = {
    Login,
    Register,
    Role
};
