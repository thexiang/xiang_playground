seed:
	docker exec -it node-api npx prisma migrate dev --name init
	docker exec -it node-api npx prisma migrate dev deploy
	docker exec -it node-api ts-node seed_dev.ts
	docker exec -it node-api ts-node read_dog.ts