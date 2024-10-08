echo Building server image
docker-compose build

echo Down the existing containers first
docker-compose down

echo Composing up the server containers
docker-compose up -d

