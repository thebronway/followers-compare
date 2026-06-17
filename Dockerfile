# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Install native Chromium and dependencies for react-snap
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]