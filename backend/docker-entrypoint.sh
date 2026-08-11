#!/bin/sh
set -e

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Seeding super admin (idempotent)..."
node prisma/seed.js

echo "Starting server..."
exec "$@"
