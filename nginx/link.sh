#!/bin/bash

# create sites-enabled folder
if [ ! -d "/etc/nginx/sites-enabled/" ]; then
    mkdir -p "/etc/nginx/sites-enabled/"
fi
# ----------------------------------------------------------------------------------------------------
# create links
ln -s /etc/nginx/sites-available/ahmetproje.com.tr.conf /etc/nginx/sites-enabled/
# ----------------------------------------------------------------------------------------------------

# Check Nginx configuration
if nginx -t ; then
   echo "Nginx configuration test successful"
else
   echo "Nginx configuration test failed"
   exit 1
fi

# reload Nginx
service nginx reload