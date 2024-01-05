#!/bin/bash

directory="./"

# Create the directory if it doesn't exist
if [ ! -d "$directory" ]; then
    mkdir -p "$directory"
fi

# Write keys
echo "Enter fullchain.pem (Ctrl+d to end)"
read -d $'\04' key
echo -e "$key" > $directory/fullchain.pem
unset key

echo -e "\nEnter privkey.pem (Ctrl+d to end)"
read -d $'\04' key
echo -e "$key" > $directory/privkey.pem
unset key

echo -e "\nCertificate files were created at: $directory"