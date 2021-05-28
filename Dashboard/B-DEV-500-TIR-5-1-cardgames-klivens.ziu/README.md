# Dashboard

Run (sudo) 

```
docker-compose down
docker-compose build
docker-compose up
```

Update API keys and .env variables in the docker compose file if neccessary.

## Frontend

Frontend built with Vue.js, active on port `:3000`.

## Backend

Backend built with Node.js and Express, active on port `:8080`.


## Database

MySql database active on port `:3306`.

Default tables are in `database/schema.sql`.

### Epitech Intranet

- #### Notifications:
    
    This widget shows you your last intranet notifications.
    
    Parameters:
     - auth link: neccessary to login
     - max_notifications: number of notifications in the widget (min: 1, max: 5, default: 5)
     - refresh: refresh interval of the widget's fronted (min: 60, max: 86400, default: 300)

### Weather

Service from (https://openweathermap.org). API key is needed.

- #### Weather:
    
    This widget shows you the actual weather of a city, anywhere in the world.
    
    Parameters:
     - city: name of the city
     - refresh: refresh interval of the widget's frontend (min: 60, max: 86400, default: 300)

- #### Forecast:
    
    This widget shows you the forecast of a city, for the next 15 days with a 3 hours period.
    
    Parameters:
     - city: name of the city
     - refresh: refresh interval of the widget's frontend (min: 60, max: 86400, default: 300)

### News

Service from (https://newsapi.org). An API key is needed.

- #### Breaking news:
    
    This widget shows you last news with different articles link for a specific country.
    
    Parameters:
     - country: code of the country (ex: GB, US, ...)
     - refresh: refresh interval of the widget's frontend (min: 60, max: 86400, default: 300)

- #### Topic news:
    
    This widget shows you last news with different articles link for a specific topic.
    
    Parameters:
     - topic: the topic you're interested in (ex: Sports, Bitcoin, ...)
     - refresh: refresh interval of the widget's frontend (min: 60, max: 86400, default: 300)

### Twitter

Trash Service from (https://twitter.com). An API key is needed.

- #### Account:
    
    This widget shows you information about a twitter account like name, description, followers and followings.
    
    Parameters:
     - account: name of an account you want to monitor (without the `@`).
     - refresh: refresh interval of the widget's frontend (min: 60, max: 86400, default: 300)

- #### Favorites:
    
    This widget shows you last favorites of a twitter account.
    
    Parameters:
     - account: name of an account you want to monitor (without the `@`).
     - refresh: refresh interval of the widget's frontend (min: 60, max: 86400, default: 300)

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

- **POST** `/login`:
    - Description: route used to authenticate user.
    - Parameters:
        ```
      {
            username: string
            password: string
      }
        ```
    - Response:
        ```
      {
            user_id: int
            username: string
            token: string
      }
        ```

- **POST** `/register`:
    - Description: route used to create a new user.
    - Parameters:
        ```
      {
            username: string
            password: string
      }
        ```
    - Response:
        ```
      {
            user_id: int
            username: string
            token: string
      }
        ```

- **GET** `/account` [AUTH REQUIRED]:
    - Description: get data about the authenticated user.
    - Response:
        ```
      {
            user_id: int
            username: string
            widget_count: int
            oauth: [] of {
                service: string
                status: int    (-1: unavailable, 0: not signed in, 1: signed in)
                url: string    (oauth redirect url)
            }
      }
        ```

- **POST** `/change-password` [AUTH REQUIRED]:
    - Description: update the password of the authenticated user
    - Parameters:
        ```
      {
            old_password: string
            new_password: string
      }
        ```

- **GET** `/widgets` [AUTH REQUIRED]:
    - Description: get the list of the widgets of the authenticated user
    - Response:
        ```
      [] of {
            service: string
            widget: string
            id: int
      }
        ```

- **POST** `/widget` [AUTH REQUIRED]:
    - Description: add a new widget
    - Parameters:
        ```
      {
            service: string
            widget: string
            params: object that contains parameters to build a widget
      }
        ```
    - Response:
        ```
      {
            id: int
      }
        ```

- **GET** `/widget/:service/:widget/:id` [AUTH REQUIRED]:
    - Description: get information about a specific widget
    - Response:
        ```
      {
            params: [] of {
                name: string
                type: string
                ... other informations
            }
            current: object that contains current parameters of the widget
            html: string (in html format to display it directly)
      }
        ```

- **PATCH** `/widget/:service/:widget/:id` [AUTH REQUIRED]:
    - Description: update parameters of an existing widget
    - Parameters: object that contains parameters to build a widget
    - Response:
        ```
      {
            message: string
      }
        ```

- **DELETE** `/widget/:service/:widget/:id` [AUTH REQUIRED]:
    - Description: delete a widget
    - Response:
        ```
      {
            message: string
      }
        ```

- **POST** `/oauth/:service` [AUTH REQUIRED]:
    - Description: add oauth connection
    - Parameters: element contained in the callback request of the oauth
    - Response:
        ```
      {
            message: string
      }
        ```

- **DELETE** `/oauth/:service` [AUTH REQUIRED]:
    - Description: remove oatuh connection
    - Response:
        ```
      {
            message: string
      }
        ```