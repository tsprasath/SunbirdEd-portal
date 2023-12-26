# Use the official Node.js image with the specified version
FROM node:14.19.1-alpine AS builder

# Set an environment variable to increase memory limit for Node.js
ENV NODE_OPTIONS="--max_old_space_size=8096"

# Install git and python
RUN apk --no-cache add git make python3 autoconf g++ nasm bzip2

# Set python alias for compatibility
RUN ln -s /usr/bin/python3 /usr/bin/python

# Install Angular CLI globally
RUN npm install --global @angular/cli@11
# Copy the entire project to the working directory
COPY . .
# Building Client
RUN cd src/app && \
    mkdir -p app_dist && \
    rm -rf dist-cdn && \
    cd client && \
    yarn install --no-progress --production=true --ignore-engines && \
    npm run build && \
    cd ../ && \
    mv app_dist/dist/index.html app_dist/dist/index.ejs

# Building Server
WORKDIR src/app
COPY src/app/helpers app_dist/helpers
COPY src/app/proxy app_dist/proxy
COPY src/app/resourcebundles app_dist/resourcebundles
COPY src/app/package.json app_dist/package.json
COPY src/app/framework.config.js app_dist/framework.config.js
COPY src/app/sunbird-plugins app_dist/sunbird-plugins
COPY src/app/routes app_dist/routes
COPY src/app/constants app_dist/constants
COPY src/app/controllers app_dist/controllers
COPY src/app/server.js app_dist/server.js

RUN cd app_dist && \
    yarn install --no-progress --production=true --ignore-engines && \
    node helpers/resourceBundles/build.js -task="phraseAppPull" && \
    mkdir -p node_modules/client-cloud-services/dist


FROM node:14.19.0-slim
RUN useradd -u 1001 -md /home/sunbird sunbird
WORKDIR /home/sunbird
COPY --chown=sunbird  --from=builder src/app/app_dist /home/sunbird/app_dist/
COPY --chown=sunbird  --from=builder bundle.js /home/sunbird/app_dist/node_modules/client-cloud-services/dist/bundle.js
USER sunbird
WORKDIR /home/sunbird/app_dist
EXPOSE 3000
CMD ["node", "server.js", "&"]