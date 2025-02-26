# open_templates

Just few templates to spin up projects

# Welcome!!

Pending changes........

### This is a Django and Nextjs template

#### Functionality available:

1. Authentication via email and password
2. Authentication via google
3. Token, Access Token, Refresh Token functionality.
4. On the frontend we have a login page with a google login button
5. Protected routes for authenticated users via middleware and auth context provider

## DOCKER 🐳

If you have docker installed it is quite simple to spin up this project on the docker.
All the instructions below are for the linux operating system.

First create the docker images

```sh
docker compose build
```

Second deploy the containers

```sh
docker compose up -d --build
```

To check the status of the containers:

```sh
docker ps
```

To stop the containers:

```sh
docker compose down
```

To remove the containers:

```sh
docker compose rm
```

To remove all the containers, images, and volumes: (`Careful, do it only if you have no other containers, image, volumes`)

```sh
docker compose system prune -a
```

To run the shell in the container:

```sh
docker exec -it <container_id> sh
```

To exit the shell:

```sh
exit
```

Going into the docker shell can help create super admin

```sh
docker exec -it container_id python manage.py createsuperuser
```

Also if you want to use google auth, you can create a google application and create an api client.

STEP 1: Login into the admin panel, Go to applications under Django OAuth Toolkit, and create a new application.

STEP 2: Associate the application with the super admin.

STEP 3:

- Client Type - Public
- Authorization Grant Type - Client Credentials
- Name - Give this Application some name

STEP 3: Uncheck the Hash Client Secret. `Very important, because it is a bug`

###

###

## Django

### Getting Started

If you plan to run the project on your local machine,

### Social Auth - Google Authentication

[Google developer](https://console.cloud.google.com/apis)

Setting up a screen for allowing users to sign in via google

1. Start with OAuth consent screen
   - Fill out basic details
2. Scopes
   - Add email and profiles
3. Add test users who can login via google to test your app login process
4. Now create OAuth client ID

Now setting up a way our backend can talk to google

###

## NEXT JS

### Getting Started

If you plan to run the project on your local machine,

1. Make sure you installed the packages/modules using the command:

```bash
npm i
```

2. Setup the `.env` file by looking at the sample `.env.sample` file. (You might need to setup
   things from the backend as well)

3. First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Sources:

ShadCN Components
https://jidefr.medium.com/shadcn-ui-add-components-and-resources-0846b0f57596

#### References

https://permify.co/post/rbac-in-django/

https://pdipesh.medium.com/django-rest-framework-permissions-example-8ed9809c432d

https://dev.to/forhadakhan/multi-role-user-authentication-in-django-rest-framework-3nip

https://medium.com/@subhamx/role-based-access-control-in-django-the-right-features-to-the-right-users-9e93feb8a3b1

## PORTS

- django - 8000

- nextjs - 3000

- go-backend - 4030

- node-mongodb - 4040

- json-db - 4050

- node-postgres - 4000

- node-socket - 5000

- ui-app (Mobile App) - 8081

## Frontend Frameworks

Alternate frontend frameworks to experiment with

**Vue JS**
https://nuxt.com/

**Angular**
https://angular.dev/

## Mobile App Development (Expo)

### Few styling & component libraries

- https://www.nativewind.dev **(using)**

- https://nativewindui.com

- https://gluestack.io/ui

- https://github.com/mrzachnugent/react-native-reusables

- https://rnr-docs.vercel.app/getting-started/introduction/ **(using)**

- React Native Paper - https://callstack.github.io/react-native-paper/

- React Native Sheet - https://rnas.vercel.app/

# Go

Install GO

### initialize the project

Eg: go mod init github.com/varunteja007006/open_templates

### Run the file

```sh
go run file_name.go
```

### Build the file

```sh
go build -o file_name file_name.go
```

## Building web server with go

GET "order:3136027566058651130"
"{\"order_id\":3136027566058651130,\"customer_id\":123,\"line_items\":[{\"product_id\":321,\"quantity\":1,\"price\":100}],\"created_at\":\"2025-01-26T21:45:09.198061722+05:30\",\"shipped_at\":null,\"completed_at\":null}"

# Go Socket

# json-db

This is a json server for the purpose of learning json-server. It stores the data in a json file.

## Usage

Install the packages

```bash
npm i
```

Run the server

```bash
npm run dev
```

## Test the requests

Install https://github.com/Huachao/vscode-restclient extension in vscode

Open the db.http file

You can start making the requests.

# nextjs

### UI libraries

https://headlessui.com/

### Components libraries

https://originui.com/

https://shadcn-extension.vercel.app/docs/smart-datetime-input

### Blogs

Some blogs I refer for help with developing UI

https://jidefr.medium.com/shadcn-ui-add-components-and-resources-0846b0f57596

# node-mongodb

https://mongoosejs.com/docs/index.html

# node-postgres

https://orm.drizzle.team/

https://orm.drizzle.team/docs/get-started-postgresql

# Node Socket Connections

https://socket.io/docs/v4/server-application-structure/

https://github.com/TomDoesTech/chat-tutorial

<!-- import { io } from "socket.io-client";
const socket = io("https://api.example.com", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
}); -->
