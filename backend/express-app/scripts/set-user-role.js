// scripts/set-user-role.js
// Usage: node scripts/set-user-role.js user@example.com role_name
// This script will replace the user's roles with the single specified role (remove old roles).

const path = require('path');
const models = require(path.join(__dirname, '..', 'models'));

async function run() {
  const email = process.argv[2];
  const roleName = process.argv[3];
  if (!email || !roleName) {
    console.error('Usage: node scripts/set-user-role.js user@example.com role_name');
    process.exit(2);
  }

  try {
    await models.sequelize.authenticate();

    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      console.error('User not found:', email);
      process.exit(1);
    }

    let [role, created] = await models.Role.findOrCreate({
      where: { role_name: roleName },
      defaults: { role_name: roleName }
    });
    if (created) console.log(`Created role '${roleName}' (id=${role.role_id || role.id})`);

    // setRoles replaces all existing roles with the provided array
    await user.setRoles([role]);

    console.log(`User ${email} now has role '${roleName}' (previous roles removed).`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

run();
