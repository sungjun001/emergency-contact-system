FROM node:20

WORKDIR /app

# COPY package.json yarn.lock ./
# RUN yarn install
COPY package.json package-lock.json ./
RUN npm install pm2 -g
RUN npm install

COPY . ./

EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]