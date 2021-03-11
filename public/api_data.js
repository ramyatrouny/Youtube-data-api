define({ "api": [
  {
    "type": " post ",
    "url": "/auth/login",
    "title": "User Login",
    "name": "login",
    "description": "<p>Authenticate a user</p>",
    "group": "Authentication",
    "permission": [
      {
        "name": "isPublic"
      }
    ],
    "version": "0.0.0",
    "filename": "controller/user/login.js",
    "groupTitle": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>user email address</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>user password</p>"
          }
        ]
      }
    }
  },
  {
    "type": " post ",
    "url": "/auth/register",
    "title": "User signup",
    "name": "register",
    "description": "<p>Register a new user</p>",
    "group": "Authentication",
    "permission": [
      {
        "name": "isPublic"
      }
    ],
    "version": "0.0.0",
    "filename": "controller/user/signup.js",
    "groupTitle": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>user email address</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>user password</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "full_name",
            "description": "<p>user full name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "youtube_channel_id",
            "description": "<p>user youtube channel id</p>"
          }
        ]
      }
    }
  },
  {
    "type": " get ",
    "url": "/auth/me",
    "title": "Logged in User Details",
    "name": "Personal_Details",
    "description": "<p>Get the current user details</p>",
    "group": "User",
    "permission": [
      {
        "name": "isAuthenticated"
      }
    ],
    "version": "0.0.0",
    "filename": "controller/user/self.js",
    "groupTitle": "User"
  },
  {
    "type": " post ",
    "url": "/auth/refresh",
    "title": "Refresh user access token",
    "name": "refreshToken",
    "description": "<p>Refresh user token</p>",
    "group": "User",
    "permission": [
      {
        "name": "isAuthenticated"
      }
    ],
    "version": "0.0.0",
    "filename": "controller/user/refreshToken.js",
    "groupTitle": "User"
  },
  {
    "type": " put ",
    "url": "/auth/:id/update",
    "title": "Update logged in user information",
    "name": "updateUserDetails",
    "description": "<p>update user details</p>",
    "group": "User",
    "permission": [
      {
        "name": "isAuthenticated"
      }
    ],
    "version": "0.0.0",
    "filename": "controller/user/updateUser.js",
    "groupTitle": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>user email address</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>user password</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "full_name",
            "description": "<p>user full name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "youtube_channel_id",
            "description": "<p>user youtube channel id</p>"
          }
        ]
      }
    }
  },
  {
    "type": " get ",
    "url": "/videos/:id",
    "title": "get the videos details",
    "name": "userVideoDetails",
    "description": "<p>get the current video details</p>",
    "group": "Video",
    "permission": [
      {
        "name": "isAuthenticated"
      }
    ],
    "version": "0.0.0",
    "filename": "controller/videos/videoDetails.js",
    "groupTitle": "Video"
  },
  {
    "type": " get ",
    "url": "/videos",
    "title": "get the user videos",
    "name": "userVideos",
    "description": "<p>get the user videos</p>",
    "group": "Video",
    "permission": [
      {
        "name": "isAuthenticated"
      }
    ],
    "version": "0.0.0",
    "filename": "controller/videos/userVideos.js",
    "groupTitle": "Video"
  }
] });
