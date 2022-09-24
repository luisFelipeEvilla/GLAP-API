# GLAP-API

A backend service for public services breakdowns

![image](https://user-images.githubusercontent.com/35440641/192122361-9bfe36f7-021d-4ba3-ab9e-b75c24865712.png)

## Technologies:
    * NodeJs
    * Typescript
    * Express
    * Mongodb
    * JSON Web Token (jwt)

## Usage

Install dependencies

```bash
npm install
```

### confgirue enviroment variables

you need to create a `.env` configuration file in the project roof which will look like this:

```
# port number for API for listening
SERVER_PORT = 3000 

# your mongodb connection uri
DB_URI = 'mongodb://localhost/my_database' 

# your secret password for jwt token generation
jwtSecret = 'secretkey' 

# default offset for pagination
DEFAULT_OFFSET = 25 
```

### deploy

for deploy your application, only need to run the following command

```bash
npm start
```
