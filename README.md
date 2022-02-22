

Notes:
get aws cred
```
aws-vault exec xiangxupersonal -d 5h
```

### Dev Setup:
```
docker-compose up --build
make seed
```

### Prod Deployment Note
build prod images of different services
```
make build-image AWS_ACC_ID=<YOUR_AWS_ACCOUNT_ID>
```

login ecr and push prod images, aws cred needed in terminal
```
make push-images
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