FROM node:21-alpine
RUN mkdir /ecotrip_back
COPY . ./ecotrip_back
WORKDIR /ecotrip_back
RUN npm i
EXPOSE 3000
CMD ["npm","run","start"]