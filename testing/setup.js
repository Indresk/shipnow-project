import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './.env.test' });

before(async () => {
	const mongoDbUri = process.env.MONGODB_URI;
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
});
