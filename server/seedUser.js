const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User'); // adjust path if needed

dotenv.config();

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const users = [
      {
        name: 'Admin User',
        email: 'admin@student.com',
        password: 'admin123',
        role: 'admin',
      },
      {
        name: 'Trainer User',
        email: 'trainer@student.com',
        password: 'trainer123',
        role: 'trainer',
      },
      {
        name: 'Student User',
        email: 'student@student.com',
        password: 'student123',
        role: 'student',
      },
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({
        email: userData.email,
      });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(
          userData.password,
          10
        );

        await User.create({
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          role: userData.role,
        });

        console.log(`${userData.role} created`);
      } else {
        console.log(`${userData.role} already exists`);
      }
    }

    console.log('Seeding completed');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedUsers();