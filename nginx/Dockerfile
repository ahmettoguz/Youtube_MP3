# Use the official Nginx image as the base image
FROM nginx

# Set the working directory to /app
WORKDIR /app

# Create sites-enabled folder
RUN mkdir -p /etc/nginx/sites-enabled/

# Copy the Nginx configuration files into the container
COPY ./default.conf /etc/nginx/conf.d/default.conf

# ahmetproje.com.tr - Copy project port forwarding configurations and keys and create links of the enabled sites
COPY ./ahmetproje.com.tr/ahmetproje.com.tr.conf /etc/nginx/sites-available/ahmetproje.com.tr.conf
COPY ./ahmetproje.com.tr/keys/ /etc/nginx/ssl/ahmetproje.com.tr
RUN ln -s /etc/nginx/sites-available/ahmetproje.com.tr.conf /etc/nginx/sites-enabled/

# Check Nginx configuration
# RUN if nginx -t ; then \
#     echo "Nginx configuration test successful"; \
# else \
#     echo "Nginx configuration test failed"; \
#     exit 1; \
# fi

# Reload Nginx
RUN service nginx reload

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443

# CMD instruction to start Nginx in the foreground
CMD nginx -g "daemon off;"