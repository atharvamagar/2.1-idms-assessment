const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const isLocalMongoUri = (uri) => {
  if (!uri) return true;
  return uri.includes('localhost') || uri.includes('127.0.0.1');
};

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (uri && !isLocalMongoUri(uri)) {
      await mongoose.connect(uri, { dbName: 'employee_management' });
      console.log('MongoDB connected successfully');
      return;
    }

    if (process.env.NODE_ENV === 'production') {
      throw new Error('MONGO_URI must be configured in production');
    }

    try {
      await mongoose.connect(uri || 'mongodb://127.0.0.1:27017/employee_management', {
        dbName: 'employee_management',
        serverSelectionTimeoutMS: 2000,
      });
      console.log('MongoDB connected successfully');
    } catch (localError) {
      if (!mongoServer) {
        mongoServer = await MongoMemoryServer.create();
      }

      const fallbackUri = mongoServer.getUri();
      await mongoose.connect(fallbackUri, { dbName: 'employee_management' });
      console.log('MongoDB connected successfully (in-memory fallback)');
    }
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
