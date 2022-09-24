# GLAP-API

A backend service for public services breakdowns

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