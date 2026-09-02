// import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// dotenv.config({ path: './.env.test' });
let mongoServer;

before(async () => {
	// const mongoDbUri = process.env.MONGODB_URI;
	mongoServer = await MongoMemoryServer.create();
	const mongoDbUri = mongoServer.getUri();
	if (!mongoDbUri) {
		throw new Error('Falta MONGODB_URI en el ambiente para ejecutar los test');
	}

	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(mongoDbUri);
	}
});

afterEach(async () => {
	const collections = mongoose.connection.collections;

	for (const collectionName of Object.keys(collections)) {
		await collections[collectionName].deleteMany({});
	}
});

after(async () => {
	await mongoose.connection.close();
	await mongoServer.stop();
});
