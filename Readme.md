<h1 align = "center"> 🤖 R2PJI2 Droid - ScientistApp </h1>

<p align="left">
    <a href="https://nodejs.org/en/"><img src="https://img.shields.io/badge/node-latest-green"></a> 
    <a href="http://expressjs.com/"><img src="https://img.shields.io/badge/express-%5E4.17.2-green"></a> 
    <a href="https://ejs.co/"><img src="https://img.shields.io/badge/ejs-%5E3.1.5-green"></a> 
    <a href="https://getbootstrap.com/"><img src="https://img.shields.io/badge/bootstrap-%5E5.1.3-green"></a>
    <a href="https://d3js.org/"><img src="https://img.shields.io/badge/d3.js-%5E7.3.0-green"></a>
</p>

<h4 align="center">  <b>🚧  Work in Progress  🚧</b> </h4>

<p align="left">Project developed for the discipline of PJI2. In this project, a remote-controlled explorer robot system with camera and sensors is built, with storage and an interface for exploring sensor data. The focus of this application is the construction of a database of sensors that could be analyzed through this application.</p>

<h2 align='center'>Table of Content</h2>
<p align="center">
 <a href="#how-to-use">How to Use</a> •
 <a href="#features">Features</a> •
 <a href="#license">License</a> •
 <a href="#authors">Authors</a>
</p>

## How to Use

To run this application under development, you will need to have <a href="https://www.docker.com/">Docker</a> and <a href="https://docs.docker.com/compose/">Docker Compose</a> installed on your linux computer. First let's start with installing the docker service:
```bash

# Uninstall (if any) of Docker
sudo apt-get remove docker docker-engine docker.io containerd runc

# Update package repository and install required packages
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl
sudo apt-get install gnupg-agent software-properties-common

# Add Docker GPG key in apt
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

#  Add Docker package repository in apt
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable"

#  Install Docker
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Allow your regular system user (other than root) to be able to use Docker
sudo usermod -aG docker $user-login

    # restart the computer

# Check if the installation completed successfully
docker run hello-world
```

Then we must install the docker compose service:
```bash
# Download Compose
mkdir -p ~/.docker/cli-plugins

curl -SL https://github.com/docker/compose/releases/download/v2.0.1/docker compose -linux-
    x86_64 -o ~/.docker/cli-plugins/docker compose

chmod +x ~/.docker/cli-plugins/docker compose

# Check if the installation completed successfully
docker compose version
```

Finally to start application type the following commands in your terminal:
```bash
docker compose build
docker compose up
```

## Features

- [ ] User registration
- [ ] Remove User
- [ ] Edit User Information
- [ ] Robot Camera Streaming View
- [ ] Sensor Analysis
- [ ] Sensor Status Monitoring

## License

<p align="left"> This project is under a <a href="./LICENSE">MIT</a> license. <p>

## Authors

* Arthur Anastopulos dos Santos
* Jefferson Romero Botitano