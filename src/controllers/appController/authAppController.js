// src/controllers/userController.js

const userService = require('../services/userService');
const authService = require('../services/authService');

class UserController {
    async register(req, res) {
        try {
            const newUser = await userService.registerUser(req.body);
            res.status(201).json({ message: 'User registered successfully', data: newUser });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await authService.loginUser(email, password);
            res.status(200).json({ message: 'Login successful', data: { user, token } });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateProfile(req, res) {
        try {
            const updatedUser = await userService.updateUserProfile(req.user.id, req.body);
            res.status(200).json({ message: 'Profile updated successfully', data: updatedUser });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
