const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

const router = express.Router();
// @route   POST api/users
// @desc    Test route
// @access  Public
router.post(
        '/',
        [
                check('name', 'Name is required')
                        .not()
                        .isEmpty(),
                check('email', 'Please include a valid email').isEmail(),
                check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
        ],
        async (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(400).json({ errors: errors.array() });
                }

                const { name, email, password } = req.body;
                try {
                        let user = await User.findOne({ email });
                        if (user) {
                                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
                        }

                        user = new User({
                                name,
                                email,
                                password,
                        });

                        const salt = await bcrypt.genSalt(10);

                        user.password = await bcrypt.hash(password, salt);

                        await user.save();

                        const payload = {
                                user: {
                                        id: user.id,
                                },
                        };

                        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
                                if (err) throw err;
                                res.json({ token });
                        });
                } catch (error) {
                        console.error(error.message);
                        res.status(500).send('Server error');
                }
        }
);

module.exports = router;
