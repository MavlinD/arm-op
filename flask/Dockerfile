# --------------------------------------------------------------------------
# When Docker builds the flask container, it builds it from this image.
#
# This file pulls a Python 3 image from Docker Hub (a sort of
# GitHub for Docker images), and copies the requirements.txt file to the
# container. It then installs all the Python dependencies from it.
# --------------------------------------------------------------------------

FROM python:3.6.1

ENV PYTHONDONTWRITEBYTECODE=True
ENV ACCEPT_EULA=Y

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD ./requirements.txt /usr/src/app/requirements.txt

RUN apt-get update \
    && apt-get install -y \
    g++ \
    unixodbc-dev

RUN pip3 install --upgrade pip \
    && pip3 install -r requirements.txt
    ADD . /usr/src/app

RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list
    RUN apt-get install -y \
       apt-transport-https

RUN apt-get update \
    && apt-get install -y \
       msodbcsql17

# optional: for bcp and sqlcmd
#sudo ACCEPT_EULA=Y apt-get install mssql-tools
#echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile
#echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
#source ~/.bashrc
## optional: for unixODBC development headers
#sudo apt-get install unixodbc-dev
