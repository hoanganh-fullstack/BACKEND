// lib/mongodb.js

import { MongoClient } from 'mongodb';

export default async function connectToDatabase() {
  // Create a new MongoClient instance
  const client = new MongoClient(process.env.MONGODB_URI);

  // Connect to the database
  try {
    await client.connect();
    return client.db();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw error;
  }
}
