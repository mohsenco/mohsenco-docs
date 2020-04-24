---
id: repo-docker-web-stack-with-mysql-nginx-proxy
title: Docker web stack with mysql nginx proxy
sidebar_label: Docker web stack with mysql nginx proxy
---
:::important

The repository of this docs is on GitHub https://github.com/mohsenmottaghi/docker-web-stack-with-mysql-nginx-proxy

:::

:::caution

This docs is not ready

:::

# Docker web stack with Wordpress , MariaDB and Nginx-Pagespeed

This Repo is for Web application stack with Wordpress , MariaDB and Nginx-Pagespeed 

---

**Note** : First should edit `Secrets` files in ./secrests .

---
For use from this Repo you should have one of these:

- Docker Swarm ( Recommend )

or

- Docker-Compose (Should remove Swarm tools from `Yml` file)

## Set up your swarm

```
docker swarm init [OPTIONS]
```
for more info see [Docker Swarm Doc](https://docs.docker.com/engine/reference/commandline/swarm_init/)

#  Deploy stack
for deploy stack use 

```
docker stack deploy -c docker-compose.yml <STACK NAME>
```

**NOTE**: for update stack just need to edit files and redeploy stack.

for check stack services status
```
docker stack services <STACK NAME>
```

for remove stack
```
docker stack rm <STACK NAME>
```