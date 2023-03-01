---
draft: false
title: "Pine64 A64(+) + Armbian Buster + Docker"
snippet: ""
image: {
    src: "https://www.acervera.com/blog/2020/04/pine64-a64-armbian-docker/pine64_cluster.jpg",
    alt: "full stack web development"
}
publishDate: "2022-11-08 11:39"
category: "Tutorials"
author: "Silvia Roldan Sanchez"
tags: [webdev, tailwindcss, frontend]
---

## Table of Content.
<!-- toc -->

## Introduction.
Following the list of step to install Docker in the Pine64 cluster:

## Armbian.
1. [Download Armbian Buster image for pine64](https://www.armbian.com/pine64/)
2. Burn ssd using [Etcher](https://www.balena.io/etcher/)
3. Start Pine64 with the new ssd.
   It will take few seconds because is resizing the sdd partition to use the full size. After that:
    1. Login using `Log in as: root  Password: 1234`
    2. First login as root will ask for a new password.
    3. First login will ask to create a new admin user.
    4. Login using the new user.
4. Change host name. The default hostname is `pine64`. We are going to create a small cluster, so we don't want to use
   the same name in all nodes.
    1. Change hostname
        ```bash
        hostnamectl
        hostnamectl set-hostname pine641
        ```
    2. Replace all references to the old name in /etc/hosts
       ```bash
       sudo vi /etc/hosts
       ```
    3. Reboot
5. Update and install commons used software.
   The Debian image installed is the server version, so it comes with `htop`, `openssh`, etc..
   ```bash
   sudo apt update
   sudo apt full-upgrade
   sudo apt install neovim
   sudo update-alternatives --config editor
   sudo update-alternatives --config vi
   ```
6. Set static ip. I'm going to use 192.168.1.191 to 194 for the Pine64 nodes. So, I will add the static configuration
   in `/etc/network/interfaces`:
   ```text
   auto eth0
   #iface eth0 inet dhcp
   iface eth0 inet static
      address 192.168.1.191
      netmask 255.255.255.0
      gateway 192.168.1.1
      dns-nameservers 192.168.1.1
   ```
   And restart the network service:
   ```bash
   sudo service networking restart
   ```
## Docker
Docker officially supports Debian Buster 10, so [let's follow the documentation](https://docs.docker.com/engine/install/debian/):
```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt autoremove
sudo apt-get update

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -

sudo apt-key fingerprint 0EBFCD88

sudo add-apt-repository \
   "deb [arch=arm64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io

sudo groupadd docker
sudo usermod -aG docker $USER
```

Restart the session, to be sure changes in the user groups are available, and then:
```bash
docker run hello-world
```