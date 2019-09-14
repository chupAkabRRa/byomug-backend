# BYOMUG server

## Heroku git location:

https://git.heroku.com/byomug.git

## Heroku deploy location:

https://byomug.herokuapp.com/

## API:

1. Register - `https://byomug.herokuapp.com/users/register` (POST).
   Accepts following JSON:

```
{
	"username": "USER",
	"password": "123321"
}
```

Returns following JSON:

```
{
    "_id": "5d7d14de5c75ae0017648a56",
    "username": "dimko",
    "registeredDate": "2019-09-14T16:27:10.431Z",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDdkMTRkZTVjNzVhZTAwMTc2NDhhNTYiLCJpYXQiOjE1Njg0Nzg1MDB9.FpVFcK_7qjKIMtHTNasFfbiuPKa11qNj7pQ-lSPM6Nc"
}
```

2. Authenticate - `https://byomug.herokuapp.com/users/authenticate` (POST).
   Accepts following JSON:

```
{
	"username": "USER",
	"password": "123321"
}
```

Returns following JSON:

```
{
    "_id": "5d7d14de5c75ae0017648a56",
    "username": "dimko",
    "registeredDate": "2019-09-14T16:27:10.431Z",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDdkMTRkZTVjNzVhZTAwMTc2NDhhNTYiLCJpYXQiOjE1Njg0Nzg1MDB9.FpVFcK_7qjKIMtHTNasFfbiuPKa11qNj7pQ-lSPM6Nc"
}
```

3. Get info about user - `https://byomug.herokuapp.com/users/?id=5d7d14de5c75ae0017648a56` (GET + authorization token should be passed).
   Returns following JSON:

```
[
    {
        "_id": "5d7d14de5c75ae0017648a56",
        "username": "dimko",
        "registeredDate": "2019-09-14T16:27:10.431Z",
        "__v": 0,
        "id": "5d7d14de5c75ae0017648a56"
    }
]
```
