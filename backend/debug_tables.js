require('ts-node/register');
const { query } = require('./src/db.ts');

async function showTables() {
  try {
    console.log('🔍 Checking Railway database tables...\n');
    
    // Show all tables
    const tables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    console.log('📋 TABLES IN DATABASE:');
    tables.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });
    console.log('');
    
    // Show structure of each main table
    const mainTables = ['users', 'shareholders', 'emissions', 'emission_subscriptions'];
    
    for (const tableName of mainTables) {
      console.log(`📊 TABLE: ${tableName.toUpperCase()}`);
      try {
        const columns = await query(`
          SELECT column_name, data_type, is_nullable, column_default
          FROM information_schema.columns 
          WHERE table_name = $1
          ORDER BY ordinal_position;
        `, [tableName]);
        
        columns.rows.forEach(col => {
          console.log(`  ${col.column_name} (${col.data_type}) ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'} ${col.column_default ? `DEFAULT ${col.column_default}` : ''}`);
        });
        console.log('');
      } catch (err) {
        console.log(`  ❌ Table ${tableName} does not exist\n`);
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

showTables();