#syntax=docker/dockerfile:1.4

# Versions
FROM node:18-slim AS node_upstream
FROM nginx:alpine AS nginx_upstream


# --
# App base image
FROM node_upstream AS app_base

ARG PUBLIC_API_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL
ARG PUBLIC_WS_URL
ENV PUBLIC_WS_URL=$PUBLIC_WS_URL

# Create app directory
WORKDIR /app

# Install curl for healthcheck
RUN apt-get update && \
	apt-get install -y --no-install-recommends curl && \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/*

COPY --link --chmod=755 ./docker/app/docker-healthcheck.sh /usr/local/bin/docker-healthcheck

HEALTHCHECK --interval=10s --timeout=3s --retries=3 --start-period=30s CMD [ "docker-healthcheck" ]

# Install openssl for prisma
RUN apt-get update && \
	apt-get install -y openssl && \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/*


# --
# Npm image
FROM app_base AS npm

# Source code should be mounted here
VOLUME /app

COPY --link --chmod=755 ./docker/app/docker-npm-entrypoint.sh /usr/local/bin/docker-npm-entrypoint

ENTRYPOINT [ "docker-npm-entrypoint" ]
CMD ["--help"]


# --
# Dev image
FROM app_base AS app_dev

ENV NODE_ENV=development

# Source code should be mounted here
VOLUME /app
VOLUME /app/node_modules

COPY --link --chmod=755 ./docker/app/docker-dev-command.sh /usr/local/bin/docker-dev-command

CMD [ "docker-dev-command" ]


# --
# Prod build image

FROM app_base AS app_prod_build

ENV NODE_ENV=production

# Install dev dependencies, required for build
COPY --link ./app/package*.json ./app/tsconfig*.json ./app/astro.config.mjs .
RUN npm clean-install --include=dev && \
	npm cache clean --force

# Copy source code for build
COPY --link ./app .

# Build source code
RUN npm run build

# --
# Prod image

FROM nginx_upstream AS app_prod

WORKDIR /usr/share/nginx/html

# Copy built website
COPY --from=app_prod_build --link /app/dist ./
