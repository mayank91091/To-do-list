#builder stage
FROM node:14-alpine AS bulder
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm run build 
COPY . .

#Final Stage
FROM node:14-alpine 
WORKDIR /app
COPY --from=bulder /app/dist /app/dist 
COPY --from=builder /app/package.json  /app/package-lock.json
RUN npm install --only=production
EXPOSE 3000
CMD ["npm", "start"]
