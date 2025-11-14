// scripts/add-organizer-role.js
// Usage: node scripts/add-organizer-role.js user@example.com
// This script will create the 'organizer' role if it doesn't exist and add it to the given user.

const path = require('path');
const models = require(path.join(__dirname, '..', 'models'));

async function run() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: node scripts/add-organizer-role.js user@example.com');
    process.exit(2);
  }

  try {
    await models.sequelize.authenticate();

    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      console.error('User not found:', email);
      process.exit(1);
    }

    let role = await models.Role.findOne({ where: { role_name: 'organizer' } });
    if (!role) {
      role = await models.Role.create({ role_name: 'organizer' });
      console.log("Created role 'organizer' with id=", role.role_id || role.id);
    }

    // Use Sequelize's association helper
    await user.addRole(role);
    console.log(`Added role 'organizer' to user ${email}`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

run();
