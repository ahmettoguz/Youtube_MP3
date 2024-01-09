<h1 id="mainHeader" align="center">Youtube MP3 Converter</h1> 

<br>

<div align="center">
    <img width=250 src="frontend/assets/banner.png">
</div>

<br/>

## Table of Contents

- [Introduction](#introductionHeader)
- [Demo](#demoHeader)
- [Technologies](#technologiesHeader)
- [Features](#featuresHeader)
- [Prerequisites](#prerequisitesHeader)
- [Instructions](#instructionsHeader)
- [Contributors](#contributorsHeader)

<br/>

<h2 id="demoHeader">⚓ Demo</h2> 

https://github.com/ahmettoguz/Youtube_MP3_Converter/assets/101711642/d40b8506-f0a4-46f8-aeab-bdace80be8d9

<br/>

<h2 id="introductionHeader">📌 Introduction</h2> 

...

<br/>

<h2 id="technologiesHeader">☄️Technologies</h2> 

### DevOps

- [![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

<br/>

### Web Server

- [![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)](https://www.nginx.com/)
  
<br/>

### Backend Service

- [![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](nodejs.org)

- [![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](nodejs.orghttps://expressjs.com/)

- [![.Env](https://img.shields.io/badge/.ENV-ECD53F.svg?style=for-the-badge&logo=dotenv&logoColor=black)](https://www.ibm.com/docs/bg/aix/7.2?topic=files-env-file)
  
- [![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)](https://socket.io/)

<br/>

### Frontend Service

- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

- [![Javascript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://www.javascript.com/)
  
- [![VUE](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)](https://vuejs.org/)

- [![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)](https://jquery.com/)

- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  
- [![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

  
<br/>

<h2 id="featuresHeader">✨ Features</h2> 

* ...
  
* ...

<br/>

<h2 id="prerequisitesHeader">🔒 Prerequisites</h2> 

* ...
  
* ...

<br/>

<h2 id="instructionsHeader">📋 Instructions</h2> 

### Development Environment

#### Clone project

```bash
git clone https://github.com/ahmettoguz/Youtube_MP3_Converter
```

---

### Run backend service

```bash
cd ~/Youtube_MP3_Converter/backend

npm run start
```

---

#### Run frontend service

```bash
cd ~/Youtube_MP3_Converter/frontend

start frontend with npm run serve
```

<br/>

## Deployment Environment

#### Clone project

```bash
git clone https://github.com/ahmettoguz/Youtube_MP3_Converter
```

---

#### Frontend .env configuration

```bash
cd ~/Youtube_MP3_Converter/frontend

mv .env.txt .env

nano .env
```

---

#### Backend ssl configuration

```bash
cd ~/Youtube_MP3_Converter/backend/src/keys

bash placeKeys.sh
```

---

#### Nginx ssl

```bash
cd ~/Youtube_MP3_Converter/nginx/<domain-name>

nano <domain-name.conf>
```

```bash
cd ~/Youtube_MP3_Converter/nginx/<domain-name>/keys

bash placeKeys.sh
```

---

#### Run docker compose

```bash
cd ~/Youtube_MP3_Converter/

docker-compose up -d --build

docker ps -a

curl -I https://ahmetproje.com.tr
```

#### Stop docker compose

```bash
docker-compose down
```

<br/>

<h2 id="contributorsHeader">👥 Contributors</h2> 

<a href="https://github.com/ahmettoguz" target="_blank"><img width=60 height=60 src="https://avatars.githubusercontent.com/u/101711642?v=4"></a>

[🔝](#mainHeader)
