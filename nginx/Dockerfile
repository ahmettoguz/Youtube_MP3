# Use the official Nginx image as the base image
FROM nginx

# Set the working directory to /app
WORKDIR /app

# Create sites-enabled folder
RUN mkdir -p /etc/nginx/sites-enabled/

# Copy the Nginx configuration files into the container
COPY ./default-conf/default.conf /etc/nginx/conf.d/default.conf

# Define an array of domain names
ENV DOMAIN_NAME_1 "ahmetproje.com.tr"
ENV DOMAIN_NAME_2 "www.ahmetproje.com.tr"

# Copy the Nginx configuration files into the container for both domain names
COPY ./${DOMAIN_NAME_1}/${DOMAIN_NAME_1}.conf /etc/nginx/sites-available/${DOMAIN_NAME_1}.conf
COPY ./${DOMAIN_NAME_1}/keys/ /etc/nginx/ssl/${DOMAIN_NAME_1}
RUN ln -s /etc/nginx/sites-available/${DOMAIN_NAME_1}.conf /etc/nginx/sites-enabled/

# Copy the Nginx configuration files into the container for both domain names
COPY ./${DOMAIN_NAME_2}/${DOMAIN_NAME_2}.conf /etc/nginx/sites-available/${DOMAIN_NAME_2}.conf
COPY ./${DOMAIN_NAME_2}/keys/ /etc/nginx/ssl/${DOMAIN_NAME_2}
RUN ln -s /etc/nginx/sites-available/${DOMAIN_NAME_2}.conf /etc/nginx/sites-enabled/

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443

# CMD instruction to start Nginx in the foreground
CMD nginx -g "daemon off;"