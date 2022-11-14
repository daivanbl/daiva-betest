# daiva-betest
## _Back End Developer Test_

This application is build by NodeJS.

## Development

Open your favorite Terminal and run these commands.

First Tab:

```sh
cd producer
npm i
```

Second Tab:

```sh
cd consumer
npm i
```

## Docker

Install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

First Tab:
Run the Docker image and map the port with the following command.
```sh
cd daiva-betest
docker-compose up
```

Second Tab:
You can import the data colletions of mongoose and kafka topic by running this command.
```sh
docker-compose exec broker kafka-topics --create --bootstrap-server \ localhost:9092 --replication-factor 1 --partitions 1 --topic kafka_daiva_betest

docker exec -i mongo sh -c 'mongoimport -c users -d db_daiva_betest  --drop' < users.json

docker exec -i mongo sh -c 'mongoimport -c refreshtokens.json -d db_daiva_betest  --drop' < refreshtokens.json
```

Verify the deployment by navigating to your address (http://127.0.0.1:8080) in
your preferred browser.
# API Documentation

### Authorization

All API requests require the use of a generated Access Token or JWT.
```http
POST /auth/login
```

| Body | Type | Description |
| :--- | :--- | :--- |
| `userName` | `string` | **Required**. The Users username |
| `accountNumber` | `string` | **Required**. The Users account number |

### Responses

```javascript
{
    "id": string,
    "refreshToken": string,
    "accessToken": string
}
```

### User

API for retrieving all users from Database
```http
GET /user/all
```

### Responses

```javascript
{
    "status": string,
    "code": int,
    "message": string,
    "data": [
        {
            "_id": string,
            "userName": string,
            "accountNumber": string,
            "emailAddress": string,
            "identityNumber": string,
            "__v": int
        }
    ]
}
```

API for retrieving users by accountNumberr or IdentityNumber
```http
GET /user/:id
```

### Responses

```javascript
{
    "status": string,
    "code": int,
    "message": string,
    "data": {
        "_id": string,
        "userName": string,
        "accountNumber": string,
        "emailAddress": string,
        "identityNumber": string,
        "__v": int
    }
}
```
## Status Codes

Gophish returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
| 403 | `FORBIDDEN` |
| 500 | `INTERNAL SERVER ERROR` |

