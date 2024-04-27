# KoneksiON - Individual Project
![Open in Visual Studio Code](/assets/koneksion_logo.PNG)

## Description
This is a real-time, chat-based social media application for my individual project. Users can register with Google OAuth, chat with everyone or between users in real-time, send images, update their profiles, delete messages, and use commands like “/gif” to generate a gif and “/definitions” to get word definitions, users can also chat with AI chatbot on public group using "/chatai" commands, all powered by third-party APIs.

## Techstacks
AWS, PostgreSQL, React, React Redux, Node.js, express.js, socket.io, REST API

## Preview
- Register

![Open in Visual Studio Code](/assets/Screenshot_27-4-2024_10436_localhost.jpeg)
- Login

![Open in Visual Studio Code](/assets/Screenshot_27-4-2024_104243_localhost.jpeg)

- Setup Account

![Open in Visual Studio Code](/assets/Screenshot_27-4-2024_104549_localhost.jpeg)

- Landing Page / Public Group
### All users can send their message, upload image, delete message, chat with bots on public group in realtime

![Open in Visual Studio Code](/assets/Screenshot_27-4-2024_104228_localhost.jpeg)

- Private Message / Direct Message
### A chat between two users in realtime

![Open in Visual Studio Code](/assets/Untitled.png)

![Open in Visual Studio Code](/assets/Untitled2.png)

![Open in Visual Studio Code](/assets/Untitled3.png)

![Open in Visual Studio Code](/assets/Untitled3.png)
### Upload image too!

![Open in Visual Studio Code](/assets/Untitled5.png)

### Delete Message

![Open in Visual Studio Code](/assets/Untitled4.png)

![Open in Visual Studio Code](/assets/Untitled6.png)

- Chat with bots (on public group only)
## get words definitions using "/definitions" commands, using freeDictionary APIs

![Open in Visual Studio Code](/assets/Screenshot_27-4-2024_10560_localhost.jpeg)

## generate gif using "/gif" commands, using giphy APIs

![Open in Visual Studio Code](/assets/Screenshot_27-4-2024_105642_localhost.jpeg)

## chat with AI using "/chatAI" commands, using herc.ai APIs

![Open in Visual Studio Code](/assets/Screenshot_27-4-2024_105744_localhost.jpeg)

![Open in Visual Studio Code](/assets/Screenshot_27-4-2024_105757_localhost.jpeg)


- Updating Profile

![Open in Visual Studio Code](/assets/Screenshot_27-4-2024_105832_localhost.jpeg)

![Open in Visual Studio Code](/assets/Screenshot_27-4-2024_105851_localhost.jpeg)


## KoneksiON API Documentation

## Endpoints

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-login`
- `GET /user`

- `GET /profile`
- `GET /profile/:username`
- `POST /profile`
- `PUT /profile`

- `GET /:username/message`
- `POST /:username/message`
- `DELETE /:id/message`

- `GET /group`
- `POST /group`
- `DELETE /group/:id`

### 1. POST /register

#### Description:

Register for user

- Body

```json

  {
    "username": "Anonymous",
    "email": "test10@mail.com",
    "password": "password",
  },

```

#### Response (200 - OK)

```json
{
  "username": "Anonymous",
  "email": "test10@mail.com"
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "Validation error"
}
```

### 2. POST /login

#### Description:

Login for user

- Body

```json

  {
    "username": "Anonymous",
    "email": "test10@mail.com",
  },

```

#### Response (200 - OK)

```json
{
  "access_token": "string",
  "id": "integer",
  "username": "string"
}
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "Validation error"
}
```

### 3. POST /google-login

#### Description:

Login for user with google account

- Body

```json

  {
    "googleToken": "string"
  },

```

#### Response (200 - OK)

```json
{
  "access_token": "string",
  "id": "integer",
  "username": "string"
}
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthorized access"
}
```

### 4. GET /user

#### Description:

Get info of currently logged user

Request:

- headers:

```json
{
  "access_token": "string"
}
```

#### Response (200 - OK)

```json

  {
    {
    "id": 29,
    "username": "ajax22",
    "email": "ajax200@mail.com",
    "createdAt": "2024-03-15T02:03:10.758Z",
    "updatedAt": "2024-03-15T02:03:10.758Z",
    "Profile": {
        "id": 13,
        "UserId": 29,
        "fullName": "aj2",
        "profileImgUrl": "https://res.cloudinary.com/dkrchzi4b/image/upload/v1710496093/73ab2e9a-3f32-45b0-943a-1db5e5e47567.jpg.jpg",
        "bio": "programmer",
        "createdAt": "2024-03-15T07:46:01.491Z",
        "updatedAt": "2024-03-17T01:49:13.766Z"
    }
}
  },

```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthorized"
}
```

### 5. GET /profile

#### Description:

Get info of all profiles

Request:

- headers:

```json
{
  "access_token": "string"
}
```

#### Response (200 - OK)

```json
[
  {
    "id": 1,
    "UserId": 1,
    "fullName": "Alice Wonderland",
    "profileImgUrl": "https://lh3.googleusercontent.com/a/ACg8ocIFy8VDjwyn8dKokC8h5eP23XwauCwlAevWjrxOsSD5=s96-c",
    "bio": "Hello, I am Alice!",
    "createdAt": "2024-03-13T08:52:29.548Z",
    "updatedAt": "2024-03-13T08:52:29.548Z",
    "User": {
      "id": 1,
      "username": "Alice",
      "email": "alice@example.com",
      "createdAt": "2024-03-13T08:52:29.277Z",
      "updatedAt": "2024-03-13T08:52:29.277Z"
    }
  },
  {
    "id": 2,
    "UserId": 2,
    "fullName": "Bob Doe",
    "profileImgUrl": "https://th.bing.com/th/id/R.1871862d87bb8037d953317fb4497189?rik=MBf1NyuchSQUtQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile.png&ehk=Ouu2uMvvMPnkP1bdIY2BTAzbwhRoG9p03NUzbwGLhlg%3d&risl=&pid=ImgRaw&r=0",
    "bio": "Hello, I am Bob!",
    "createdAt": "2024-03-13T08:52:29.548Z",
    "updatedAt": "2024-03-13T08:52:29.548Z",
    "User": {
      "id": 2,
      "username": "Bob",
      "email": "bob@example.com",
      "createdAt": "2024-03-13T08:52:29.406Z",
      "updatedAt": "2024-03-13T08:52:29.406Z"
    }
  }
]
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthorized"
}
```

### 6. GET /profile/:username

#### Description:

Get info of profile based on username

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "username": "string"
}
```

#### Response (200 - OK)

```json
[
  {
    "id": 4,
    "UserId": 3,
    "fullName": "Charlie",
    "profileImgUrl": "https://th.bing.com/th/id/R.1871862d87bb8037d953317fb4497189?rik=MBf1NyuchSQUtQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile.png&ehk=Ouu2uMvvMPnkP1bdIY2BTAzbwhRoG9p03NUzbwGLhlg%3d&risl=&pid=ImgRaw&r=0",
    "bio": "i'm a web developer.",
    "createdAt": "2024-03-13T12:05:03.622Z",
    "updatedAt": "2024-03-13T14:07:48.994Z"
  }
]
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthorized"
}
```

### 7. POST /profile

#### Description:

Create new profile for new user

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- Body

```json

  {
    "profileImgUrl": "string",
    "fullName": "string",
    "bio": "string",
  },

```

#### Response (200 - OK)

```json
[{ "message": "Profile created Succesfully." }]
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthorized"
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "Validation error"
}
```

### 8. PUT /profile

#### Description:

Update profile

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- Body

```json

  {
    "profileImgUrl": "Blob",
    "fullName": "string",
    "bio": "string",
  },

```

#### Response (200 - OK)

```json
[{ "message": "Profile created Succesfully." }]
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthorized"
}
```

### 9. GET /:username/message

#### Description:

Get private messages between two user (the currently logged one) and other user based on username

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "username": "string"
}
```

#### Response (200 - OK)

```json
 {
        "id": 824,
        "SenderId": 29,
        "ReceiverId": 2,
        "text": "Test",
        "createdAt": "2024-03-16T05:01:41.607Z",
        "updatedAt": "2024-03-16T05:01:41.607Z",
        "Sender": {
            "username": "Anonim20",
            "Profile": {
                "profileImgUrl": "https://res.cloudinary.com/dkrchzi4b/image/upload/v1710496093/73ab2e9a-3f32-45b0-943a-1db5e5e47567.jpg.jpg",
                "fullName": "Anonymous"
            }
        },
        "messageBelongsToLoggedUser": true
    },
    {
        "id": 870,
        "SenderId": 29,
        "ReceiverId": 2,
        "text": "HeLLo",
        "createdAt": "2024-03-16T11:54:36.719Z",
        "updatedAt": "2024-03-16T11:54:36.719Z",
        "Sender": {
            "username": "Anonim20",
            "Profile": {
                "profileImgUrl": "https://res.cloudinary.com/dkrchzi4b/image/upload/v1710496093/73ab2e9a-3f32-45b0-943a-1db5e5e47567.jpg.jpg",
                "fullName": "Anonymous"
            }
        },
        "messageBelongsToLoggedUser": true
    },
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthorized"
}
```

#### Response (404 - Not Found)

```json
{
  "message": "User not found."
}
```

### 10. POST /:username/message

#### Description:

Send a private message between a user

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "text": "string"
}
```

- params:

```json
{
  "username": "string"
}
```

#### Response (200 - OK)

```json
{
  "id": 878,
  "text": "a",
  "SenderId": 29,
  "ReceiverId": 2,
  "updatedAt": "2024-03-17T04:50:28.694Z",
  "createdAt": "2024-03-17T04:50:28.694Z"
}
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthorized"
}
```

#### Response (404 - Not Found)

```json
{
  "message": "User not found."
}
```

### 11. DELETE /:id/message

#### Description:

Delete a private message between users, based on message id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "string"
}
```

#### Response (200 - OK)

```json
{ "message": "Message succesfully deleted." }
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthorized"
}
```

#### Response (404 - Not Found)

```json
{
  "message": "Message not found."
}
```

### 12. GET /group

#### Description:

Get all message in public group

Request:

- headers:

```json
{
  "access_token": "string"
}
```

#### Response (200 - OK)

```json
[
  {
    "id": 2,
    "UserId": 2,
    "GroupId": 1,
    "text": "Hello Alice!",
    "imgUploadGroup": null,
    "createdAt": "2024-03-13T08:52:29.577Z",
    "updatedAt": "2024-03-13T08:52:29.577Z",
    "Group": {
      "id": 1,
      "name": "Public",
      "createdAt": "2024-03-13T08:52:29.567Z",
      "updatedAt": "2024-03-13T08:52:29.568Z"
    },
    "User": {
      "username": "Bob",
      "Profile": {
        "id": 2,
        "UserId": 2,
        "fullName": "Bob Doe",
        "profileImgUrl": "https://th.bing.com/th/id/R.1871862d87bb8037d953317fb4497189?rik=MBf1NyuchSQUtQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile.png&ehk=Ouu2uMvvMPnkP1bdIY2BTAzbwhRoG9p03NUzbwGLhlg%3d&risl=&pid=ImgRaw&r=0",
        "bio": "Hello, I am Bob!",
        "createdAt": "2024-03-13T08:52:29.548Z",
        "updatedAt": "2024-03-13T08:52:29.548Z"
      }
    },
    "messageBelongsToLoggedUser": false
  },
  {
    "id": 1,
    "UserId": 1,
    "GroupId": 1,
    "text": "Hello everyone in Group 1!",
    "imgUploadGroup": null,
    "createdAt": "2024-03-13T08:52:29.577Z",
    "updatedAt": "2024-03-13T08:52:29.577Z",
    "Group": {
      "id": 1,
      "name": "Public",
      "createdAt": "2024-03-13T08:52:29.567Z",
      "updatedAt": "2024-03-13T08:52:29.568Z"
    },
    "User": {
      "username": "Alice",
      "Profile": {
        "id": 1,
        "UserId": 1,
        "fullName": "Alice Wonderland",
        "profileImgUrl": "https://lh3.googleusercontent.com/a/ACg8ocIFy8VDjwyn8dKokC8h5eP23XwauCwlAevWjrxOsSD5=s96-c",
        "bio": "Hello, I am Alice!",
        "createdAt": "2024-03-13T08:52:29.548Z",
        "updatedAt": "2024-03-13T08:52:29.548Z"
      }
    },
    "messageBelongsToLoggedUser": false
  }
]
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthorized"
}
```




### 13. POST /group

#### Description:

Send a message to public group

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- Body

```json

  {
    "imgUploadGroup": "string",
    "text": "string",
  },

```

#### Response (200 - OK)

```json
{
    "id": 543,
    "UserId": 29,
    "GroupId": 1,
    "text": "test",
    "imgUploadGroup": "https://i.imgur.com/WiRSHll.png",
    "updatedAt": "2024-03-17T03:13:27.979Z",
    "createdAt": "2024-03-17T03:13:27.979Z"
}
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthorized"
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "Validation error"
}
```

### 14. - DELETE /group/:id

#### Description:

Delete a message owned by user in public group

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "string"
}
```

#### Response (200 - OK)

```json
{ "message": "Message succesfully deleted." }
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Unauthorized"
}
```

#### Response (404 - Not Found)

```json
{
  "message": "Message not found."
}
```

### Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```



