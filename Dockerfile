FROM ubuntu:22.04

# Avoid prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    ca-certificates \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 20 (LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Set the working directory inside the container
WORKDIR /workspaces/app

# Install global packages for Next.js CLI tools
RUN npm install -g next

# We don't COPY anything yet because the folder is empty.
# We will use Docker Compose to mount your local folder here.

EXPOSE 3000

# Keep the container alive so we can exec into it
CMD ["sleep", "infinity"]