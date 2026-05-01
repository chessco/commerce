const mariadb = require('mariadb');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = mariadb.createPool({
  host: 'localhost',
  port: 3306,
  user: 'voltia_user',
  password: 'voltia_password',
  database: 'voltia_db',
  connectionLimit: 5,
  allowPublicKeyRetrieval: true
});

async function seed() {
  let conn;
  try {
    conn = await pool.getConnection();
    const password = await bcrypt.hash('Pitaya.123', 10);
    const tenantId = '00000000-0000-0000-0000-000000000000'; // Default UUID for seed

    console.log('Seeding Tenant...');
    await conn.query(
      "INSERT IGNORE INTO tenants (id, name, slug, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())",
      [tenantId, 'Voltia Core', 'default']
    );

    console.log('Seeding Admin User...');
    await conn.query(
      "INSERT IGNORE INTO users (id, email, password, firstName, lastName, role, tenantId, createdAt, updatedAt) VALUES (UUID(), ?, ?, ?, ?, 'ADMIN', ?, NOW(), NOW())",
      ['admin@pitayacode.io', password, 'Admin', 'Pitaya', tenantId]
    );

    console.log('Seeding Client User...');
    await conn.query(
      "INSERT IGNORE INTO users (id, email, password, firstName, lastName, role, tenantId, createdAt, updatedAt) VALUES (UUID(), ?, ?, ?, ?, 'USER', ?, NOW(), NOW())",
      ['client@pitayacode.io', password, 'Client', 'Pitaya', tenantId]
    );

    console.log('Manual Seed Successful!');
  } catch (err) {
    console.error('Error during manual seed:', err);
  } finally {
    if (conn) conn.end();
    pool.end();
  }
}

seed();
