//import { PrismaPg } from "@prisma/adapter-pg";
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('../../generated/prisma')

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({
    connectionString
});
const prisma = new PrismaClient({
    adapter
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB Connected via Prisma");
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
  console.log("DB Disconnected");
};

module.exports = {prisma, connectDB, disconnectDB};