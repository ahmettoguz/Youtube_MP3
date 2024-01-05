technologies
vue
nodejs
ajax
---
dependencies nodejs
---
go backend and frontned file and download dependencies

npm i

edit .env.txt file as .env and configure host name of the backend.

start backend with npm run start

start frontend with npm run serve

---

line 69 node_modules\yt-converter\src\utils\convertAudio.js:
        const pathname = path.resolve(process.cwd(), directoryDownload, `${title}.mp3`)
convert that line as following:
        const pathname = path.resolve(process.cwd(), directoryDownload, `a.mp3`)
---

git pull

docker-compose down

docker-compose up -d --build

docker logs nginx-c

nginx -t