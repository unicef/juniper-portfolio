FROM node:12 as build

WORKDIR /app 

# Copy the react app to the container
COPY . /app/

# Prepare the container for building react
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm run build

# Prepare nginx
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Fire up nginx
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]