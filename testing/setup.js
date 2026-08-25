import dotenv from 'dotenv';
import connectDB from '../src/db';
import mongoose from 'mongoose';

dotenv.config({ path: '.env.test' });
dotenv.config();

before(async () => {
	const mongoDbUri = process.env.MONGODB_URI;
	if (!mongoDbUri) {
		throw new Error('Falta MONGODB_URI en el ambiente para ejecutar los test');
	}

	if (mongoose.connection.readyState === 0) {
		await connectDB(mongoDbUri);
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
});
