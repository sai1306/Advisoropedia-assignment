const bcrypt = require('bcrypt');

async function generateSalt() {
    const saltRounds = 10; // Adjust based on security needs and processing power
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      return salt;
    } catch (error) {
      console.error('Error generating salt:', error);
      throw error; // Or handle the error 
    }
  }
  async function hashPassword(password) {
    const salt = await generateSalt();
    try {
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error; // Or handle the error 
    }
  }
  module.exports = {hashPassword};