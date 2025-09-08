const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:iuzakIAZhFviojhSMiTFfbgdnIAFRWGJ@hopper.proxy.rlwy.net:42209/railway',
  ssl: { rejectUnauthorized: false }
});

async function checkDatabase() {
  try {
    console.log('🔍 Sjekker databasestrukturen...');
    
    // List alle tabeller
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('\n📋 Tabeller i databasen:');
    tables.rows.forEach(row => console.log('  -', row.table_name));
    
    // Sjekk shareholders tabellstruktur
    const shareholdersStructure = await pool.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'shareholders'
      ORDER BY ordinal_position
    `);
    
    console.log('\n🏢 Shareholders tabellstruktur:');
    shareholdersStructure.rows.forEach(col => 
      console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`)
    );
    
    // Tell antall aksjonærer
    const shareholderCount = await pool.query('SELECT COUNT(*) as count FROM shareholders');
    console.log(`\n👥 Antall aksjonærer: ${shareholderCount.rows[0].count}`);
    
    // Sjekk totalt antall aksjer
    const totalShares = await pool.query('SELECT SUM(shares_owned) as total FROM shareholders');
    console.log(`📊 Totalt antall aksjer: ${totalShares.rows[0].total}`);
    
    // Sjekk aktive emisjoner
    const activeEmissions = await pool.query("SELECT * FROM emissions WHERE status = 'ACTIVE'");
    console.log(`\n🚀 Aktive emisjoner: ${activeEmissions.rows.length}`);
    if (activeEmissions.rows.length > 0) {
      activeEmissions.rows.forEach(em => 
        console.log(`  - ${em.title}: ${em.new_shares_offered} nye aksjer`)
      );
    }
    
    // Sjekk emission subscriptions
    const subscriptions = await pool.query('SELECT COUNT(*) as count FROM emission_subscriptions');
    console.log(`\n📝 Tegninger totalt: ${subscriptions.rows[0].count}`);
    
    const approvedSubs = await pool.query("SELECT COUNT(*) as count FROM emission_subscriptions WHERE status = 'APPROVED'");
    console.log(`✅ Godkjente tegninger: ${approvedSubs.rows[0].count}`);
    
    // Sjekk om det finnes noen historikk-tabeller
    const historyTables = tables.rows.filter(row => 
      row.table_name.includes('history') || 
      row.table_name.includes('snapshot') || 
      row.table_name.includes('archive')
    );
    console.log('\n📜 Historikk/snapshot tabeller:');
    if (historyTables.length > 0) {
      historyTables.forEach(row => console.log('  -', row.table_name));
    } else {
      console.log('  - Ingen historikk-tabeller funnet');
    }
    
  } catch (error) {
    console.error('❌ Database feil:', error.message);
  } finally {
    await pool.end();
  }
}

checkDatabase();