import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
	const audioFiles = await prisma.audioFile.findMany();
	return audioFiles;
});
