const { Pool } = require('pg');

const pool = new Pool({
  connectionString: https://oblinoremisjonrailway-production.up.railway.app/
  ssl: { rejectUnauthorized: false }
});

async function checkRealColumns() {
  try {
    console.log('🔍 FAKTISKE KOLONNERNAVN I RAILWAY:');
    
    // cap_table_snapshots struktur
    const snapshots = await pool.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'cap_table_snapshots'
      ORDER BY ordinal_position
    `);
    
    console.log('\n📊 cap_table_snapshots:');
    snapshots.rows.forEach(col => 
      console.log(`  - ${col.column_name}: ${col.data_type}`)
    );
    
    // emissions struktur  
    const emissions = await pool.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'emissions'
      ORDER BY ordinal_position
    `);
    
    console.log('\n🚀 emissions:');
    emissions.rows.forEach(col => 
      console.log(`  - ${col.column_name}: ${col.data_type}`)
    );
    
    // emission_subscriptions struktur
    const subs = await pool.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'emission_subscriptions'
      ORDER BY ordinal_position
    `);
    
    console.log('\n📝 emission_subscriptions:');
    subs.rows.forEach(col => 
      console.log(`  - ${col.column_name}: ${col.data_type}`)
    );
    
  } catch (error) {
    console.error('❌ Feil:', error.message);
  } finally {
    await pool.end();
  }
}

checkRealColumns();