

Notes:
get aws cred
```
aws exec xiangxupersonal -d 5h
```

### Dev Setup:
```
docker-compose up --build
make seed
```

### Prod Deployment Note
login ecr
```
aws ecr get-login-password --region us-east-1 \
  | docker login --username AWS --password-stdin 868156198587.dkr.ecr.us-east-1.amazonaws.com
```

build user service images
```
docker build \
  -f services/users/Dockerfile.prod \
  -t 868156198587.dkr.ecr.us-east-1.amazonaws.com/test-driven-users-fargate:prod \
  ./services/users
```

build client service images with dummy REACT_APP_API_SERVICE_URL, because this is automatically generate from AWS, we get it when terraform finishs the provision
```
docker build \
  -f services/client/Dockerfile.prod \
  -t 868156198587.dkr.ecr.us-east-1.amazonaws.com/test-driven-client-fargate:prod \
  --build-arg NODE_ENV=production \
  --build-arg REACT_APP_API_SERVICE_URL=http://notreal \
  ./services/client
```

push user service images
```
docker push 868156198587.dkr.ecr.us-east-1.amazonaws.com/test-driven-users-fargate:prod
```

push client service images
```
docker push 868156198587.dkr.ecr.us-east-1.amazonaws.com/test-driven-client-fargate:prod
```

once terraform done with apply, rebuild the image with the env with alb dns
```
docker build \
  -f services/client/Dockerfile.prod \
  -t 868156198587.dkr.ecr.us-east-1.amazonaws.com/test-driven-client-fargate:prod \
  --build-arg NODE_ENV=production \
  --build-arg REACT_APP_API_SERVICE_URL=<alb_dns> \
  ./services/client
```

push again
```
docker push 868156198587.dkr.ecr.us-east-1.amazonaws.com/test-driven-client-fargate:prod
```

go to AWS console, create new revision of task definition for client, (not sure if it's nessassary) , 
and restart the client services to use the new image. 