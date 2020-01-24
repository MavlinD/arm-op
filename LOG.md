## used link
[Proto](https://github.com/Radu-Raicea/Dockerized-Flask/)
https://www.8host.com/blog/obsluzhivanie-prilozhenij-flask-s-pomoshhyu-gunicorn-i-nginx-v-ubuntu-16-04/  
https://tproger.ru/translations/guide-into-python-imports/  
https://www.geeksforgeeks.org/g-fact-41-multiple-return-values-in-python/  
https://docs.microsoft.com/ru-ru/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-ver15  
https://djbook.ru/examples/62/  

## used command

make venv:
python3 -m venv /path/to/new/virtual/environment

activate:
source tutorial-env/bin/activate


git:
git config --global core.excludesfile ~/.gitignore_global


killall -9 gunicorn

wget -O - https://dbeaver.io/debs/dbeaver.gpg.key | sudo apt-key add -
echo "deb https://dbeaver.io/debs/dbeaver-ce /" | sudo tee /etc/apt/sources.list.d/dbeaver.list

ls -lh flask/project/
sudo chown -R ${USER}:${USER} flask/

https://www.geeksforgeeks.org/packing-and-unpacking-arguments-in-python/

## docker commands:

docker save -o /home/mdv/HDD500Gb/docker_images/glass_flask.tar glass-backend_flask
docker save -o /home/mdv/HDD500Gb/docker_images/glass_backend_nginx.tar glass-backend_nginx

sudo docker load < /opt/docker_images/glass_backend_nginx.tar
sudo docker load < /opt/docker_images/glass_backend_flask.tar 
sudo docker-compose up -d

## optional command:

docker image rm glass-backend_flask:latest  
docker container rm flask 

## ssh commands:

scp /home/mdv/HDD500Gb/docker_images/glass_backend_nginx.tar mdv@azot.kmr@oais01.azot.kmr:/opt/docker_images/glass_backend_nginx.tar  
scp /home/mdv/HDD500Gb/docker_images/glass_backend_flask.tar mdv@azot.kmr@oais01.azot.kmr:/opt/docker_images/glass_backend_flask.tar

## setup permission cmd:

sudo mkdir /opt/www
sudo groupadd www : - добавляем группу 
sudo usermod -aG www root : - добавляем рута в группу
sudo usermod -aG www $USER : - добавляем себя в группу
sudo chgrp -R www www : - меняем группу владельцев папки
sudo chmod -R g+rwx /opt/www : - меняем права на папку

sudo mkdir docker_images
sudo chgrp -R www docker_images/
sudo chmod -R g+rwx /opt/docker_images/

## scp commands:

scp -r /home/mdv/Projects/glass-backend/flask  mdv@azot.kmr@oais01.azot.kmr:/opt/www/glass-backend/
scp -r /home/mdv/Projects/glass-backend/docker-compose.yml   mdv@azot.kmr@oais01.azot.kmr:/opt/www/glass-backend/docker-compose.yml 

## python commands:

pip3 freeze>flask/requirements.txt

curl -i -H "Content-Type: application/json" -X POST -d '{"wagon":"11111", "consignment": "fizz bizz"}' http://localhost:5000/api


