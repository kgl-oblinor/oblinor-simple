#!/bin/bash

# Railway PostgreSQL connection details
DATABASE_URL="postgresql://postgres:iuzakIAZhFviojhSMiTFfbgdnIAFRWGJ@hopper.proxy.rlwy.net:42209/railway"

echo "🚀 Starting Railway database migration..."
echo "📊 Connecting to Railway PostgreSQL..."

# Run the migration
psql "$DATABASE_URL" < database/init.sql

if [ $? -eq 0 ]; then
    echo "✅ Database migration completed successfully!"
    echo ""
    echo "📝 Test accounts created:"
    echo "   Admin: admin@oblinor.no / Admin123!"
    echo "   User:  user3@oblinor.no / Pass123!"
    echo ""
    echo "🔗 Your app is ready at: https://oblinoremisjonrailway-production.up.railway.app"
else
    echo "❌ Migration failed. Please check the error messages above."
fi