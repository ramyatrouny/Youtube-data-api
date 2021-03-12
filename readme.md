# 360mea Vuz Backend code Challenge

## Task Summary

The purpose of this assignment is to build a RESTful API that aggregates YouTube
Videos for specific Youtubers & Social influencers using Node.js.

## Technical details

The backend code challenge is written in NodeJS using ExpressJs Framework connected to a MongoDB Instance through Mongoose ODM

## Packages And Definition
* [Axios](https://www.npmjs.com/package/axios) : For HTTP Requests
* [Bcrypt](https://www.npmjs.com/package/bcrypt): To encrypt Password before saving it in the database
* [Cors](https://www.npmjs.com/package/cors): To disable Cors in case of deployment requirements
* [Debug](https://www.npmjs.com/package/debug): Debug package was used to debug while development
* [Dotenv](https://www.npmjs.com/package/dotenv): loads environment variables
* [Express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for node
* [Joi](https://www.npmjs.com/package/joi): The most powerful schema description language and data validator for JavaScript.
* [Mongoose](https://www.npmjs.com/package/mongoose): Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
* [Morgan](https://www.npmjs.com/package/morgan):HTTP request logger middleware for node.js
* [Winston](https://www.npmjs.com/package/winston): A logger for just about everything.

### Development Packages
* [Apidoc](https://www.npmjs.com/package/apidoc): API doc creates documentation from API descriptions in your source code.
* [Nodemon](https://www.npmjs.com/package/nodemon): Nodemon is a tool that helps develop node. js-based applications automatically restarting the node application when file changes in the directory are detected.


## Minimum Requirements
Minimum NodeJS Requirements 
```bash
NodeJs: 12.0.0 
npm 6.0.0
```

## Installation

1. Clone the following repo

```bash
git clone https://github.com/ramyatrouny/360MeaCodeChallenge.git
```

2. Change directory to 360MeaCodeChallenge Repo
```bash
cd 360MeaCodeChallenge
```

3. Npm install to install the libraries
```bash
npm install 
```

4. Create a .env File
```bash
touch .env
```

5. Fill the .env file with the following
```bash
MONGO_URI=<YOUR LOCAL MongoDB HOST>
MONGO_DB_NAME=<YOUR MongoDB DATABASE NAME>
JWT_SECRET=<JWT SECRET>
YOUTUBE_API_KEY=<YOUTUBE API KEY>
```

## Usage 

1. To Generate an API Documentation (the output will be in /public folder)
```bash
npm run doc
```

2. To run the code
```bash
npm run start
```

3. For development purposes
```bash
npm run dev
```

## IMPORTANT LINKS

1. Make sure the code is running and access the documentation on 
```bash
http://localhost:3000
```
![Alt text](/images/documentation.JPG?raw=true "Documentation")

2. Postman Collection: 
```bash
https://www.getpostman.com/collections/1b4ea96b2a2d122e960f
```
![Alt text](/images/Postman.JPG?raw=true "Postman Collection")

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
MIT License

Copyright (c) 2021 Rami Atrouni

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.