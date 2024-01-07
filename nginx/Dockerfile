# Use the official Nginx image as the base image
FROM nginx

# Set the working directory to /app
WORKDIR /app

# Create sites-enabled folder
RUN mkdir -p /etc/nginx/sites-enabled/

# Copy the Nginx configuration files into the container
COPY ./default-conf/default.conf /etc/nginx/conf.d/default.conf

# Define an array of domain names
ENV DOMAIN_NAMES "www.ahmetproje.com.tr"

# Copy the Nginx configuration files into the container for the domain name
RUN for DOMAIN_NAME in $DOMAIN_NAMES; do \
    COPY ./${DOMAIN_NAME}/${DOMAIN_NAME}.conf /etc/nginx/sites-available/${DOMAIN_NAME}.conf; \
    COPY ./${DOMAIN_NAME}/keys/ /etc/nginx/ssl/${DOMAIN_NAME}; \
    ln -s /etc/nginx/sites-available/${DOMAIN_NAME}.conf /etc/nginx/sites-enabled/; \
done

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443

# CMD instruction to start Nginx in the foreground
CMD nginx -g "daemon off;"