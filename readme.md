# 🔥 BACKEND  yelp - feelers  🔥

### API ><>  https://yelpfeelers.herokuapp.com/ <><


## Project Management

 [Trello](https://trello.com/b/N8pN0SZV/yelp-feelers) 

## Table of Contents

- [🔥 BACKEND yelp - feelers 🔥](#%F0%9F%94%A5-backend-yelp---feelers-%F0%9F%94%A5)
    - [API ><> https://yelpfeelers.herokuapp.com/ <><](#api--httpsyelpfeelersherokuappcom)
  - [Project Management](#project-management)
  - [Table of Contents](#table-of-contents)
  - [Summary Table of API Endpoints](#summary-table-of-api-endpoints)
    - [Register 🤖](#register-%F0%9F%A4%96)
    - [Login ☠️](#login-%E2%98%A0%EF%B8%8F)
    - [Yelp Data 🔱](#yelp-data-%F0%9F%94%B1)
    - [Bookmarks 🔒](#bookmarks-%F0%9F%94%92)
    - [Reviews 📝](#reviews-%F0%9F%93%9D)
  - [DATA SCHEMA](#data-schema)
    - [✨ Tech Used ✨](#%E2%9C%A8-tech-used-%E2%9C%A8)
    - [Author](#author)

## Summary Table of API Endpoints 
| Type   | Endpoints             | Description                                             |
| ------ | --------------------- | ------------------------------------------------------- |
| POST   | /api/users/register   | Register user                                           |
| GET    | /api/users/current    | get current user                                        |
| POST   | /api/users/login      | login                                                   |
| GET    | /api/yelp             | get yelp business details & query location and term     |
| GET    | /api/yelp/reviews/:id | get business reviews by id business_id                  |
| GET    | /api/bookmarks        | get all bookmarks and current user                         |
| GET    | /api/bookmarks/:id    | get bookmark by id only you can only get your bookmarks |
| POST   | /api/users/login      | add business to your bookmarks                          |
| PUT    | /api/bookmarks/:id    | update only your bookmarks                              |
| DELETE | /api/bookmarks/:id    | delete only your bookmarks                              |
| GET    | /api/reviews          | get all reviews [ connectd to my pg ]                   |
| POST   | /api/reviews          | post a review [ connectd to my pg ]                     |
| GET    | /api/reviews/:id      | get a review by id business_id [ connectd to my pg ]    |


### Register 🤖
```
{
  "username": "test", // unique , string
  "password": "test", // string
}
```

` 200 ✅`
```
{
    "username": "miranda",
    "password": "$2a$10$NtXkxEETBseG6/fn1b6Jt.iDAaEJhJrOitUiDetULQ40DyfrTwKW6"
}
```
`400 ❌`
```
{
  "message": {
        "username": "username field is required",
        "password": "Password field is required"
    }
}
```
### Login ☠️

`200  ✅`
```
{
    "success": true,
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJtaXJhbmRhIiwiYXZhdGFyIjoiLy93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8xZWUxODc3YzY2NTVlY2M3MWRmZWFkMzExYzc3MWJkMD9zPTIwMCZyPXBnJmQ9bW0iLCJpYXQiOjE1NTI0NDgxMjYsImV4cCI6NDE0NDQ0ODEyNn0.rDJArQXAe0S4lD1c1E8eTks7XIe4qvBbJ0kIEPB3ZS4",
    "user": {
        "id": 7,
        "username": "miranda",
        "avatar": "//www.gravatar.com/avatar/1ee1877c6655ecc71dfead311c771bd0?s=200&r=pg&d=mm"
    }
}
```
`400 ❌`
```
{
  "message": {
        "username": "username field is required",
        "password": "Password field is required"
    }
}
```

### Yelp Data 🔱
`business /api/yelp || /api/yelp?location=New York&term=taco  200 ✅`
```
[
      {
        "id": "DAZ6F_1zDZp3qa6X1OjuCg",
        "alias": "city-tacos-san-diego",
        "name": "City Tacos",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/s0Z9Zic1xLzty6BXXAGsgg/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/city-tacos-san-diego?adjust_creative=K_LEoK1MMSLkCWW3JVcg8w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=K_LEoK1MMSLkCWW3JVcg8w",
        "review_count": 1649,
        "categories": [
            {
                "alias": "tacos",
                "title": "Tacos"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 32.748735,
            "longitude": -117.129417
        },
        "transactions": [
            "delivery"
        ],
        "price": "$",
        "location": {
            "address1": "3028 University Ave",
            "address2": "",
            "address3": "",
            "city": "San Diego",
            "zip_code": "92104",
            "country": "US",
            "state": "CA",
            "display_address": [
                "3028 University Ave",
                "San Diego, CA 92104"
            ]
        },
        "phone": "+16192962303",
        "display_phone": "(619) 296-2303",
        "distance": 5192.08681657183
    },
]

```
`reviews /api/yelp/reviews/os09iVkYkzIg9G1xEIepiA 200 ✅`
```
[
    {
        "id": "FXop6zvBZinP0NpLQ7tFVg",
        "url": "https://www.yelp.com/biz/city-tacos-san-diego?adjust_creative=K_LEoK1MMSLkCWW3JVcg8w&hrid=FXop6zvBZinP0NpLQ7tFVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=K_LEoK1MMSLkCWW3JVcg8w",
        "text": "To be honest, I love this place's tacos, but I think they have poor business etiquette. Today I placed an order for tacos and a few minutes later I realized...",
        "rating": 5,
        "time_created": "2019-03-01 17:42:06",
        "user": {
            "id": "B8LkHuYYP_ZsmatWBI14Qg",
            "profile_url": "https://www.yelp.com/user_details?userid=B8LkHuYYP_ZsmatWBI14Qg",
            "image_url": "https://s3-media1.fl.yelpcdn.com/photo/ZFEPz_8A-OsZZ281IIVlAg/o.jpg",
            "name": "Jamie B."
        }
    },
]

``` 

### Bookmarks 🔒
`GET 200 ✅`
```
{
    "total": "5",
    "last_page": 1,
    "per_page": 10,
    "current_page": 1,
    "from": 0,
    "to": 5,
    "data": [
        {
            "id": 5,
            "password": "$2a$10$uvJgYFL0.tGzP/ODg/Ojv..kTQXqwqShaNytSThiOxf1uqpxQ33XO",
            "username": "testing1",
            "created_at": "2019-03-13T02:28:06.131Z",
            "updated_at": "2019-03-13T02:28:06.131Z",
            "avatar": "//www.gravatar.com/avatar/6b7330782b2feb4924020cc4a57782a9?s=200&r=pg&d=mm",
            "bookmark": [
                {
                    "user_id": 5,
                    "id": 17,
                    "business_id": "ssJJPFuV6tTDgHYe2w9csQ",
                    "alias": "oscars-mexican-seafood-san-diego-3",
                    "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/nmtXm16znYiTmTIP5MQdBA/o.jpg",
                    "is_closed": false,
                    "categories": "tacos",
                    "rating": 4,
                    "latitude": "32.808189",
                    "longitude": "-117.260846",
                    "transactions": "test",
                    "price": "$",
                    "location": "San Francisco",
                    "display_phone": "(858) 488-6392",
                    "my_rating": "2"
                },
            ]
        }
    ]
}
```

`POST & PUT 200 ✅`
```
  {
      "business_id": "ssJJPFuV6tTDgHYe2w9csQ",         //STRING
      "alias": "oscars-mexican-seafood-san-diego-3",   //STRING
      "inmtXm16znYiTmTIP5MQdBA/o.jpg",                 //STRING
      "is_closed": false,                              //STRING
      "categories": "tacos",                           //STRING
      "rating": 4,                                     //INTEGER
      "latitude": "32.808189",                         //STRING
      "longitude": "-117.260846",                      //STRING
      "transactions": "test",                          //STRING
      "price": "$",                                    //STRING
      "location": "San Francisco",                     //STRING
      "display_phone": "(858) 488-6392",               //STRING
      "my_rating": "2"                                 //STRING
    },
```

### Reviews 📝
`schema for reviews`
```
{
  "url": "https://s3-media1.fl.yelpcdn.com/bphoto/nmtXm16znYiTmTIP5MQdBA/o.jpg",            //STRING
  "text": "text here",                                                                      //STRING
  "rating": 4,                                                                              //STRING
  "business_id": "ssJJPFuV6tTDgHYe2w9csQ"                                                   //STRING
 
}
```
`200 ✅`

```
{
    "total": "5",
    "last_page": 1,
    "per_page": 10,
    "current_page": 1,
    "from": 0,
    "to": 5,
    "data": [
        {
            "id": 7,
            "password": "$2a$10$NtXkxEETBseG6/fn1b6Jt.iDAaEJhJrOitUiDetULQ40DyfrTwKW6",
            "username": "miranda",
            "created_at": "2019-03-13T03:32:30.362Z",
            "updated_at": "2019-03-13T03:32:30.362Z",
            "avatar": "//www.gravatar.com/avatar/1ee1877c6655ecc71dfead311c771bd0?s=200&r=pg&d=mm",
            "stars": 0,
            "reviews": []
        },
        {
            "id": 5,
            "password": "$2a$10$uvJgYFL0.tGzP/ODg/Ojv..kTQXqwqShaNytSThiOxf1uqpxQ33XO",
            "username": "testing1",
            "created_at": "2019-03-13T02:28:06.131Z",
            "updated_at": "2019-03-13T02:28:06.131Z",
            "avatar": "//www.gravatar.com/avatar/6b7330782b2feb4924020cc4a57782a9?s=200&r=pg&d=mm",
            "stars": 0,
            "reviews": []
        },
    ]
}
```
## DATA SCHEMA
`Schema table`
![](assets/01.png)

`Diagram of group flow`

![](assets/02.png)


### ✨ Tech Used ✨
```
"dependencies": {
    "axios": "^0.18.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^6.2.0",
    "express": "^4.16.4",
    "gravatar": "^1.8.0",
    "helmet": "^3.15.1",
    "jsonwebtoken": "^8.5.0",
    "knex": "^0.16.3",
    "knex-paginator": "^1.3.1",
    "morgan": "^1.9.1",
    "passport": "^0.4.0",
    "passport-jwt": "^4.0.0",
    "pg": "^7.8.1",
    "sqlite3": "^4.0.6",
    "validator": "^10.11.0"
  },
  "devDependencies": {
    "eslint": "^5.15.1",
    "eslint-config-airbnb-base": "^13.1.0",
    "eslint-plugin-import": "^2.16.0",
    "jest": "^24.3.1",
    "nodemon": "^1.18.10",
    "supertest": "^4.0.0"
  },
```



### Author
- 🔱 John Benedict Miranda 🔱
