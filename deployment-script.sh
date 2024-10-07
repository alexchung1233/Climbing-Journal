echo Pull latest changes
git pull 
echo Building server image
docker-compose build
echo Composing up the server containers
docker-compose up -d

