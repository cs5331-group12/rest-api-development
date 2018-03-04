FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y nodejs npm
RUN apt-get install -y python-pip
RUN apt-get install -y apache2
RUN pip install -U pip
RUN pip install -U django
RUN pip install -U django-cors-headers
RUN pip install -U djangorestframework
RUN pip install -U markdown
RUN pip install -U django-filter
RUN echo "ServerName localhost  " >> /etc/apache2/apache2.conf
RUN echo "$user     hard    nproc       20" >> /etc/security/limits.conf
ADD ./src/service /service
ADD ./src/html /var/www/html
RUN cd /var/www/html && npm install
EXPOSE 80
EXPOSE 8080
CMD ["/bin/bash", "/service/start_services.sh"]