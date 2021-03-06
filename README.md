# shoes_api


## About
A friend(Zuko) of my brother is running a shoe shop and already have an online catalogue that allows people to check his stock. But he would like to make his inventory available to other systems. He heard about API’s and think that his shop will really benefit from having an API.  asked me to make him a shoe catalogue Api application.

## Customers are able to :
- See the available shoes in the shop.
- Search shoes by size using text area.
- Search shoes by color using text area.
- Search shoes by brand using text area.
- buy the shoes that they want.

## Zuko will be able to:
- See available stock.
- Add new stock.
- Update the existing stock.

## Let's start
- Clone my [repository](https://github.com/Amandankosiyane/shoes_api) from github to your machine.
- Copy and paste the following code to your terminal:
```
 $ git clone https://github.com/Amandankosiyane/shoes_api.git.

```
- Before you start anything you first need to make sure that you have the following _installed:_
> NodeJS.

> MongoDB.

> Package.JSON dependencies.

### Installation:
###### NodeJS
- First check if you have NodeJS installed in your machine by typing **node -v**. if you already have NodeJS, your terminal will show you the version of NodeJS that you have. If you do not have NodeJS installed, then install it in your terminal following [these](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04) commands.
###### MongoDB
- Click [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04) to get guidance on how to install mongoDB, **NB:** do part 1 only.
###### Package.JSON dependencies
- Since you already have Package.JSON file, you need to install the dependencies by typing the following command:
```
npm install

```
- Now that you have installed your dependencies JSON file should look like this:
```javascript

{
  "name": "shoes_api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "body-parser": "^1.17.2",
    "express": "^4.15.4",
    "express-flash": "0.0.2",
    "express-handlebars": "^3.0.0",
    "express-session": "^1.15.5",
    "mongoose": "^4.11.8"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


```
## Let's run the Application locally
- If you installed everything correctly by now you should be able to run the Application locally.
- In your terminal type the following command:
```
- nodemon
or
- node index.js

```
- If you do not have errors you should see this in your terminal(in my case i used nodemon to run the Application):
```
[nodemon] 1.11.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node index.js`
`open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`. See http://mongoosejs.com/docs/connections.html#use-mongo-client
express-session deprecated undefined resave option; provide resave option index.js:20:9
express-session deprecated undefined saveUninitialized option; provide saveUninitialized option index.js:20:9
web app started on port: 3018

```
- Run the Application in the browser by typing in the localhost number:
```
http://localhost:3018

```
- Then you should be able to run the application.
- If you want to check the admin side just click the _add Stock_ navigation tab then you will see the admin side.

## Let's run the Application on Heroku
- I assume that you already have the following:
> Node.js and npm installed.

> An existing Node.js app.

> A free Heroku account if not then [create](https://signup.heroku.com/dc) one.
- Now you have heroku account so let's deploy on Heroku. Follow these steps to deploy using Heroku:
```
- $ git add .
- $ git commit -m "type in a message"
- $ heroku login
> enter your heroku logins
- $ heroku create
- $ git push heroku master

```
- To run the Application online:
```
$ heroku open

```
- You can now run the Application.
## Tools used to run the online Application
- [MLAB](https://mlab.com/) - Cloud database service that hosts [MongoDB](https://www.mongodb.com/) databases.
- [npm](https://www.npmjs.com/) - Package manager for JavaScript software.

## By:
[Amanda Nkosiyane](https://github.com/Amandankosiyane) codeX student.
