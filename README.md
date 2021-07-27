# fullstack-interview-test
Interview test for fullstack Software Engineers


## System requirement

For running setup you must be installed docker and docker-compose apps.

## Setup
Before running project execute the next command in root folder
```
docker-compose build
```

## Testing

Running test in root folder with:
```
docker exec flat-project python manage.py test
```

## Run server

You can up the project with next command
```
docker-compose up
```
**Very important**, when you run project first time, this fail because postgres machine is in setup and django requests the services before that finish. Just press `ctrl + c` and try again.

## Website
```
localhost:8000
```

## Notes

- Only for this interview test, i shared `.env` file for simplify in setup


