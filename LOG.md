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

docker build -t mdv/nginx-arm-pq .
docker save -o /home/mdv/HDD500Gb/docker_images/flask_arm_pq-2.tar arm-op_flask_arm_pq
docker save -o /home/mdv/HDD500Gb/docker_images/nginx_arm_pq.tar mdv/nginx-arm-pq 

sudo docker load < /opt/docker_images/flask_arm_pq-2.tar 
sudo docker load < /opt/docker_images/nginx_arm_pq.tar 
sudo docker-compose up -d
// интерактивный сеанс
docker exec -it flask_arm_pq bash 


## optional command:

docker image rm glass-backend_flask:latest  
docker container rm flask 

## ssh commands:

scp /home/mdv/HDD500Gb/docker_images/flask_arm_pq.tar mdv@azot.kmr@oais01.azot.kmr:/opt/docker_images/flask_arm_pq-2.tar  
scp /home/mdv/HDD500Gb/docker_images/nginx_arm_pq.tar mdv@azot.kmr@oais01.azot.kmr:/opt/docker_images/nginx_arm_pq.tar  

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

scp -r /home/mdv/Projects/arm-op/flask  mdv@azot.kmr@oais01.azot.kmr:/opt/www/arm-pq/
scp -r /home/mdv/Projects/arm-op/flask/project/static  mdv@azot.kmr@oais01.azot.kmr:/opt/www/arm-pq/flask/project/static
scp -r /home/mdv/Projects/arm-op/docker-compose.yml   mdv@azot.kmr@oais01.azot.kmr:/opt/www/arm-pq/docker-compose.yml 
scp /home/mdv/Projects/arm-op/src/tests/fixtures/Паспорт-ФБ123456789-ПЯ123456.pdf   mdv@azot.kmr@oais01.azot.kmr:/opt/www/arm-pq/flask/project/static/fixtures/Паспорт-ФБ123456789-ПЯ123456.pdf 


## python commands:

pip3 freeze>flask/requirements.txt
python3 -m venv env

curl -i -H "Content-Type: application/json" -X POST -d '{"wagon":"11111", "consignment": "fizz bizz"}' http://localhost:5000/api
curl -i -H "Content-Type: application/json" -X POST -d '{"wagon":"11111", "consignment": "fizz bizz"}' http://oais01.azot.kmr:8900/api



