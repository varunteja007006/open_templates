# Welcome!!

### This is a Django and Nextjs template

#### Functionality available:

1. Authentication via username and password
2. Authentication via google
3. Token, Access Token, Refresh Token functionality.
4. On the frontend we have a login page with a google login button
5. Protected routes for authenticated users via middleware and auth context provider

## DOCKER 🐳

If you have docker installed it is quite simple to spin up this project on the docker

#### Up and Running the containers

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

To run the shell in the container:
`Platform : Linux`

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

###

#### References

https://permify.co/post/rbac-in-django/

https://pdipesh.medium.com/django-rest-framework-permissions-example-8ed9809c432d

https://dev.to/forhadakhan/multi-role-user-authentication-in-django-rest-framework-3nip

https://medium.com/@subhamx/role-based-access-control-in-django-the-right-features-to-the-right-users-9e93feb8a3b1
