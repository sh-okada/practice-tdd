FROM node:22

RUN npm install -g @biomejs/biome

WORKDIR /workspace/nextjs/app

COPY ./app/package.json ./
COPY ./app/package-lock.json ./

RUN npm install

COPY ./app ./

CMD ["npm", "run", "dev"]