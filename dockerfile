# ===================
# Django API
# ===================

# Silicon Mac
#FROM --platform=linux/arm64v8 python:3.11.10-alpine3.20 as API  
# Intel Linux
FROM --platform=linux/amd64 python:3.11.10-alpine3.20 as API  

# Environment
ENV PYTHONBUFFERED=TRUE

# install dependencies
COPY ./api/requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy Entrypoint
COPY ./entrypoint.sh /

# LOG DIR
RUN mkdir /var/log/gunicorn/

# change directory
WORKDIR /app

# copy source code
COPY ./api .

ENTRYPOINT ["/entrypoint.sh"]


# ===================
# Nginx for backend
# ===================
# Silicon Mac
#FROM --platform=linux/arm64v8 nginx:1.27.2-alpine as NGINX-BE  
# Intel Linux
FROM --platform=linux/amd64 nginx:1.27.2-alpine as NGINX-BE  
# Copy configuration file
COPY ./nginx/backend/nginx.conf /etc/nginx/nginx.conf


# ===================
# React FE
# ===================
# Silicon Mac
#FROM --platform=linux/arm64v8 node:22.9-alpine3.20 as FE_BUILDER  
# Intel Linux
FROM --platform=linux/amd64 node:22.9-alpine3.20 as FE_BUILDER  

WORKDIR /app
COPY ./frontend/package*.json .
RUN npm ci

COPY ./frontend .

RUN npm run build


# ===================
# Ngix for frontend
# ===================
# Silicon Mac
#FROM --platform=linux/arm64v8 nginx:1.27.2-alpine as NGINX-FE
# Intel Linux
FROM --platform=linux/amd64 nginx:1.27.2-alpine as NGINX-FE
COPY --from=FE_BUILDER /app/dist /app/dist
EXPOSE 6308
COPY ./nginx/frontend/nginx.conf /etc/nginx/nginx.conf

