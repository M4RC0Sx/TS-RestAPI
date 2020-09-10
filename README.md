# TS-RestAPI

Simple Node + Mongo DB Rest API to learn more about TypeScript.

## MongoDB installation setup on Docker:

Here is the setup process of Docker on an Arch Linux system. In Debian based systems, it should pretty similar:

Install Docker (if you do not have it installed yet).
> sudo pacman -S docker

Init Docker service.
> sudo systemctl start docker

Get the official MongoDB container.
> sudo docker pull mongo

Create your MongoDB data directory to mount it on the container and avoid data loss.
> mkdir /home/user/Docker/mongodata

Run MongoDB docker.
> sudo docker run -it -v mongodata:/data/db --name mongodb -d mongo

Get the IP of the container in order to connect to the MongoDB database running in it.
> sudo docker inspect mongodb


## Project setup:
Install typescript node packages globally.

> npm install -g typescript ts-node

Start node project.

> npm init

Install dependencies

> npm install -s @types/express express body-parser mongoose @types/mongoose nodemon

If you clonned the repository, it should work only ith **npm install** inside it.

Create tsconfig.json
The objective of this file is to create JS files in the dist directory from the TS files which we will be storing in the lib directory.

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "pretty": true,
    "target": "es6",
    "outDir": "./dist",
    "baseUrl": "./lib"
  },
  "include": ["lib/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Edit scripts in package.json to improve the development experience

```json
"scripts": {
      "build": "tsc",
      "dev": "ts-node ./lib/server.ts",
      "start": "nodemon ./dist/server.js",
      "prod": "npm run build && npm run start"
  }
```

You must edit the config according to your settings on the file **lib/config/app.ts**!

Start development server:

> npm run dev

Start production server:

> npm run prod
