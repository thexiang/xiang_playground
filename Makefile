seed:
	docker exec -it node-api npx prisma migrate dev --name init
	docker exec -it node-api npx prisma migrate dev deploy
	docker exec -it node-api ts-node seed_dev.ts
	docker exec -it node-api ts-node read_dog.ts

build-images:
	docker build \
  -f services/users/Dockerfile.prod \
  -t $(AWS_ACC_ID).dkr.ecr.us-east-1.amazonaws.com/test-driven-users-fargate:prod \
  ./services/users

	docker build \
  -f services/client/Dockerfile.prod \
  -t $(AWS_ACC_ID).dkr.ecr.us-east-1.amazonaws.com/test-driven-client-fargate:prod \
  --build-arg NODE_ENV=production \
  --build-arg REACT_APP_API_SERVICE_URL=http://notreal \
  ./services/client


push-images:
	aws ecr get-login-password --region us-east-1 \
  | docker login --username AWS --password-stdin $(AWS_ACC_ID).dkr.ecr.us-east-1.amazonaws.com

	docker push $(AWS_ACC_ID).dkr.ecr.us-east-1.amazonaws.com/test-driven-users-fargate:prod
	docker push $(AWS_ACC_ID).dkr.ecr.us-east-1.amazonaws.com/test-driven-client-fargate:prod
