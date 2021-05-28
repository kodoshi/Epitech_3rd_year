# AREA

Run (sudo) 

```
docker-compose down
docker-compose build
docker-compose up
```

Update API keys and .env variables in the docker compose file if neccessary.

## Frontend

Frontend built with React.js, active on port `:8081`.

## Backend

Backend built with Node.js and Express, active on port `:8080`.

## Mobile

Mobile built with React Native.


## Database

Cloud MongoDB instance is used. 

# Services Used

- Discord
- International Space Station API
- Forex API
- Weather API
- Random Joke API
- Chuck Norris Facts API
- Reddit
- Currency Trading API


# API References

Parameters and responses have to be present in request/response body as a json object.

Routes with [AUTH REQUIRED] will need an Authorization header containing a valid token. This token can be obtained on `/login` and `/register` routes.

If an error occurs, response will contain:
```
{
    error: string
}
```

- **GET** `/about.json`:
    - Description: route used to get information about services and widgets.

- **POST** `/signin`:
    - Description: route used to authenticate user.

- **POST** `/register`:
    - Description: route used to create a new user.

	**GET** `/logs/:userId` [AUTH REQUIRED]:
    - Description: get the user logs

- **PUT** `/user/:userId` [AUTH REQUIRED]:
    - Description: update the authenticated user.

- **GET** `/user/:userId` [AUTH REQUIRED]:
    - Description: get data about the authenticated user.
- **DELETE** `/user/:userId` [AUTH REQUIRED]:
    - Description: delete a certain user
- **GET** `/user/photo/:userId` [AUTH REQUIRED]:
    - Description: get the users profile picture
   

- **POST** `/change-password` [AUTH REQUIRED]:
    - Description: update the password of the authenticated user
- **POST** `/discord/:userId` [AUTH REQUIRED]:
    - Description: create a discord service
- **GET** `/discord/:postId` [AUTH REQUIRED]:
    - Description: get a single collection
- **GET** `/discord/all` [AUTH REQUIRED]:
    - Description: get all the collections
- **GET** `/discord/:userId` [AUTH REQUIRED]:
    - Description: all discord collections by a single user
 - **DELETE** `/discord/all/:userId` [AUTH REQUIRED]:
    - Description: all discord collections by a single user

- **POST** `/astronaut/:userId` [AUTH REQUIRED]:
    - Description: create an ISS service
- **GET** `/astronaut/:postId` [AUTH REQUIRED]:
    - Description: get a single collection
- **GET** `/astronaut/all` [AUTH REQUIRED]:
    - Description: get all the collections
- **GET** `/astronaut/:userId` [AUTH REQUIRED]:
    - Description: all ISScollections by a single user
 - **DELETE** `/astronaut/all/:userId` [AUTH REQUIRED]:
    - Description: all astronaut collections by a single user

- **POST** `/joke/:userId` [AUTH REQUIRED]:
    - Description: create an joke service
- **GET** `/joke/:postId` [AUTH REQUIRED]:
    - Description: get a single collection
- **GET** `/joke/all` [AUTH REQUIRED]:
    - Description: get all the collections
- **GET** `/joke/:userId` [AUTH REQUIRED]:
    - Description: all joke collections by a single user
 - **DELETE** `/joke/all/:userId` [AUTH REQUIRED]:
    - Description: all joke collections by a single user

- **POST** `/trade/:userId` [AUTH REQUIRED]:
    - Description: create a trade service
- **GET** `/trade/:postId` [AUTH REQUIRED]:
    - Description: get a single collection
- **GET** `/trade/all` [AUTH REQUIRED]:
    - Description: get all the collections
- **GET** `/trade/:userId` [AUTH REQUIRED]:
    - Description: all trade collections by a single user
 - **DELETE** `/trade/all/:userId` [AUTH REQUIRED]:
    - Description: delete all trade collections by a single user
- **GET** `/weather/:postId` [AUTH REQUIRED]:
    - Description: get a single weather collection

- **POST** `/norris/:userId` [AUTH REQUIRED]:
    - Description: create a norris service
- **GET** `/norris/:postId` [AUTH REQUIRED]:
    - Description: get a single collection
- **GET** `/norris/all` [AUTH REQUIRED]:
    - Description: get all the collections
- **GET** `/norris/:userId` [AUTH REQUIRED]:
    - Description: all norris collections by a single user
 - **DELETE** `/norris/all/:userId` [AUTH REQUIRED]:
    - Description: delete all norris collections by a single user
- **GET** `/reddit/:postId` [AUTH REQUIRED]:
    - Description: get a single weather collection