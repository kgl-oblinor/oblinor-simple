const { query } = require('./src/db');

async function createHistoryTable() {
  try {
    console.log('🔧 Creating shareholder_history table...');
    
    await query(`
      CREATE TABLE IF NOT EXISTS shareholder_history (
        id SERIAL PRIMARY KEY,
        shareholder_id INTEGER NOT NULL REFERENCES shareholders(id),
        emission_id INTEGER REFERENCES emissions(id),
        shares_owned INTEGER NOT NULL CHECK (shares_owned >= 0),
        change_type VARCHAR(50) NOT NULL,
        change_reason TEXT,
        snapshot_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('✅ shareholder_history table created successfully');
    
    // Create index for better performance
    await query(`
      CREATE INDEX IF NOT EXISTS idx_shareholder_history_shareholder_id 
      ON shareholder_history(shareholder_id);
    `);
    
    await query(`
      CREATE INDEX IF NOT EXISTS idx_shareholder_history_emission_id 
      ON shareholder_history(emission_id);
    `);
    
    console.log('✅ Indexes created successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating history table:', error);
    process.exit(1);
  }
}

createHistoryTable();