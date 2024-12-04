# imagen base
FROM node:20 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 3000

CMD npm run dev
# CMD ["nginx", "-g", "daemon off;"]

# docker build -t gempresafe .
# docker run -p 3000:3000 gempresafe
# http://localhost:3000/