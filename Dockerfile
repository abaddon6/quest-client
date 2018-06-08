FROM mavenqa.got.volvo.net:18443/nginx
COPY /build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]