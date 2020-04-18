---
id: repo-cloak-shadowsocks-docker
title: Cloak Shadowsocks Docker
sidebar_label: Cloak Shadowsocks Docker
---

# Cloak with Shadowsocks on Docker

![Cloak version](https://img.shields.io/badge/Cloak_version-2.1.2-blue)
![ShadowSocks version](https://img.shields.io/badge/ShadowSocks_version-0.0.1.1-blue)
![Dockerfile](https://img.shields.io/badge/Dockerfile-Ready-brightgreen)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-Ready-brightgreen)
![Docker Build](https://img.shields.io/badge/Docker_Build-Automatic-brightgreen)
![Project Name](https://img.shields.io/badge/Project_code_name-Robe-purple)

---
Project Name: `ROBE`

---
Cloak is a universal pluggable transport that cryptographically obfuscates proxy traffic as legitimate HTTPS traffic, disguises the proxy server as a normal web server, multiplexes traffic through a fixed amount of TCP connections and provides multi-user usage control.

# Dockerfiles

|File name| Description | Auto Build | Github Action | 
|---|---|---|---|
|Dockerfile-cloak-server| Alpine container with Cloak Server | ✅ | ✅ |
|Dockerfile-cloak-client| Alpine container with Cloak Client | ✅ | ✅ |
|Dockerfile-shadowsocks-server| Alpine container with ShadowSocks Server Golang | ✅ | ✅ |
|Dockerfile-shadowsocks-client | Alpine conatiner with ShadowSocks Client Golang | ✅ | ✅ |

# Supported variables

## Cloak Server
| Key | Default value | Description |
| --- | --- | --- |
| LOCAL_IP | 127.0.0.1 | Your server IP |
| LOCAL_PORT | 12345 | Application listening port |
| METHOD | shadowsocks | |
| BYPASSUID | SB2SgfFS2LVew5OSF8L6Bw== | is a UID that is authorised without any bandwidth or credit limit restrictions |
| REDIRADDR |  1.0.0.1 | is the redirection address when the incoming traffic is not from a Cloak client |
| PRIVATEKEY | oMbG89FoR9RJGpCpOXe2hEe4DNaHt36tx2kU7F9ozEs= |  is the static curve25519 Diffie-Hellman private key encoded in base64. |
| ADMINUID | SB2SgfFS2LVew5OSF8L6Bw== | is the UID of the admin user in base64 |
| DOMAIN | example.com | |

## Cloak Client
| Key | Default value | Description |
| --- | --- | --- |
| TRANSPORT | direct | If the server host wishes you to connect to it directly, use direct. |
| METHOD | shadowsocks | is the name of the proxy method you are using. |
| ENCRYPTION | plain |  is the name of the encryption algorithm you want Cloak to use. |
| CLIENTUID | SB2SgfFS2LVew5OSF8L6Bw== | |
| PUBLICKEY | IYoUzkle/T/kriE+Ufdm7AHQtIeGnBWbhhlTbmDpUUI= | is the static curve25519 public key, given by the server admin |
| SERVERNAME | example.com | is the domain you want to make your ISP or firewall think you are visiting. |
| CONNECTIONNUM | 4 | is the amount of underlying TCP connections you want to use |
| BROWSER | chrome | is the browser you want to appear to be using. It's not relevant to the browser you are actually using. Currently, chrome and firefox are supported. | 
| SERVER_IP | | |       
| LOCAL_PORT | 443 | |
| ADMINUID | SB2SgfFS2LVew5OSF8L6Bw== | |

## ShadoSocks Server
| Key | Default value | Description |
| --- | --- | --- |
| SERVER_IP | 0.0.0.0 | Application listening IP |
| SERVER_PORT | 12345 | Application listening Port |
| ENCRYPTION | AES-256-CFB | Encryption Method |
| PASSWORD | password | Your password |

## ShadowSocks Client
| Key | Default value | Description |
| --- | --- | --- |
| SERVER_IP | `null` | |     
| SERVER_PORT | `null` | |  
| LOCAL_IP | 127.0.0.1 | Should be your Server IP |
| LOCAL_PORT | 1080 | Socks5 Port | 
| ENCRYPTION | AES-256-CFB | Encryption Method | 
| PASSWORD | password | your password |

# How to run Cloak with Shadowsocks Server
To run the server stack you have two option:

1. use `docker run` command
2. use `docker-compose up` command

To run Cloak Server with `docker run` :

```bash
docker run --name cloak-server -d -p 443:443 -e LOCAL_IP='<YOUR SERVER IP>' --restart always mohsenmottaghi/cloak-shadowsocks:cloak-server
```

Then you need to run ShadowSocks Server :

```bash
docker run --name cloak-server -d -p 12345:12345 -e PASSWORD='<YOUR PASSWORD>' --restart always mohsenmottaghi/cloak-shadowsocks:shadowsocks-server
```

if you want to run this stack with `docker-compose`:

```bash
docker-compose up -d -f docker-compose-server.yaml
```


# Cloak Configuration
[Cloak Manual - offical repo](https://github.com/cbeuw/Cloak/blob/master/README.md)

### Server
`RedirAddr` is the redirection address when the incoming traffic is not from a Cloak client. It should either be the same as, or correspond to the IP record of the `ServerName` field set in `ckclient.json`.

`BindAddr` is a list of addresses Cloak will bind and listen to (e.g. `[":443",":80"]` to listen to port 443 and 80 on all interfaces)

`ProxyBook` is a nested JSON section which defines the address of different proxy server ends. For instance, if OpenVPN server is listening on 127.0.0.1:1194, the pair should be `"openvpn":"127.0.0.1:1194"`. There can be multiple pairs. You can add any other proxy server in a similar fashion, as long as the name matches the `ProxyMethod` in the client config exactly (case-sensitive).

`PrivateKey` is the static curve25519 Diffie-Hellman private key encoded in base64.

`AdminUID` is the UID of the admin user in base64.

`BypassUID` is a list of UIDs that are authorised without any bandwidth or credit limit restrictions

`DatabasePath` is the path to userinfo.db. If userinfo.db doesn't exist in this directory, Cloak will create one automatically. **If Cloak is started as a Shadowsocks plugin and Shadowsocks is started with its working directory as / (e.g. starting ss-server with systemctl), you need to set this field as an absolute path to a desired folder. If you leave it as default then Cloak will attempt to create userinfo.db under /, which it doesn't have the permission to do so and will raise an error. See Issue #13.**

### Client
`UID` is your UID in base64.

`Transport` can be either `direct` or `CDN`. If the server host wishes you to connect to it directly, use `direct`. If instead a CDN is used, use `CDN`.

`PublicKey` is the static curve25519 public key, given by the server admin.

`ProxyMethod` is the name of the proxy method you are using.

`EncryptionMethod` is the name of the encryption algorithm you want Cloak to use. Note: Cloak isn't intended to provide transport security. The point of encryption is to hide fingerprints of proxy protocols and render the payload statistically random-like. If the proxy protocol is already fingerprint-less, which is the case for Shadowsocks, this field can be left as `plain`. Options are `plain`, `aes-gcm` and `chacha20-poly1305`.

`ServerName` is the domain you want to make your ISP or firewall think you are visiting.

`NumConn` is the amount of underlying TCP connections you want to use. The default of 4 should be appropriate for most people. Setting it too high will hinder the performance. 

`BrowserSig` is the browser you want to **appear** to be using. It's not relevant to the browser you are actually using. Currently, `chrome` and `firefox` are supported.

# ShadowSocks Golang Configuration
[Shadowsocks Manual - offical repo](https://github.com/shadowsocks/go-shadowsocks2/blob/master/README.md)

### Server

Start a server listening on port 8488 using `AEAD_CHACHA20_POLY1305` AEAD cipher with password `your-password`.

```sh
go-shadowsocks2 -s 'ss://AEAD_CHACHA20_POLY1305:your-password@:8488' -verbose
```


### Client

Start a client connecting to the above server. The client listens on port 1080 for incoming SOCKS5 
connections, and tunnels both UDP and TCP on port 8053 and port 8054 to 8.8.8.8:53 and 8.8.4.4:53 
respectively. 

```sh
go-shadowsocks2 -c 'ss://AEAD_CHACHA20_POLY1305:your-password@[server_address]:8488' \
    -verbose -socks :1080 -u -udptun :8053=8.8.8.8:53,:8054=8.8.4.4:53 \
                             -tcptun :8053=8.8.8.8:53,:8054=8.8.4.4:53
```

Replace `[server_address]` with the server's public address.

## GitHub CI

|File name|Github Action |
|---|---|
| Dockerfile-cloak-server | ![Cloak Server Docker Image CI](https://github.com/mohsenmottaghi/cloak-shadowsocks-docker/workflows/Cloak%20Server%20Docker%20Image%20CI/badge.svg) |
| Dockerfile-cloak-client | ![Cloak Client Docker Image CI](https://github.com/mohsenmottaghi/cloak-shadowsocks-docker/workflows/Cloak%20Client%20Docker%20Image%20CI/badge.svg) |
| Dockerfile-shadowsocks-server | ![Shadowsocks Server Docker Image CI](https://github.com/mohsenmottaghi/cloak-shadowsocks-docker/workflows/Shadowsocks%20Server%20Docker%20Image%20CI/badge.svg) |
| Dockerfile-shadowsocks-client | ![Shadowsocks Client Docker Image CI](https://github.com/mohsenmottaghi/cloak-shadowsocks-docker/workflows/Shadowsocks%20Client%20Docker%20Image%20CI/badge.svg) |