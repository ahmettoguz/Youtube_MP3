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

cd Youtube_MP3_Converter/

docker-compose down

git pull

docker-compose up -d --build

docker ps -a

docker logs nginx-c

docker exec -it nginx-c /bin/bash

mkdir /etc/nginx/sites-enabled/

ln -s /etc/nginx/sites-available/ahmetproje.com.tr.conf /etc/nginx/sites-enabled/

nginx -t

service nginx reload

exit