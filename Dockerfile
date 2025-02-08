FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_current.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt /app/requirements.txt

COPY package.json /app/package.json

# Install Python dependencies
RUN pip install -r requirements.txt

# Install Node dependencies
RUN npm install

COPY . /app

RUN chmod +x /app/scripts/pvc.sh

CMD ["npm","run","dev"]