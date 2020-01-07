# slim image with just the server
FROM trinitronx/python-simplehttpserver

# image serves on 8080 from this directory
COPY src/ /var/www/