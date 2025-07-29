const User = require('../models/user.model');
const bcrypt = require('bcrypt');

class UserService {
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findUserByEmail(email) {
    return await User.findOne({ email }).select('+password');
  }

  async findUserById(id) {
    return await User.findById(id).select('-password');
  }

  async updateUser(id, updateData) {
    if (updateData.password) {
      const salt = await bcrypt.genSalt(12);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    
    return await User.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    ).select('-Password');
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }

  async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = new UserService();
