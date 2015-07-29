# servercache
Cache a server using files. Useful for front end development.

# Install
```npm install -g servercache```

# Run
```

servercache --host my-server-host [--port port-number-to-run]

# Example
# my backend server runs on localhost on port 8888
# I want to run servercache on port 9999
servercache --host localhost:8888 --port 9999
# hit backend server through servercache
curl localhost:9999/some-path # cache miss, will save the response as a file
curl localhost:9999/some-path # cache hit, will read file and return response
```

# Build/Develop
```
npm install -g babel
# Build javascript
babel -d dist src

# Run server
node dist/server.js --host my-server-host
  # or
babel-node src/server.js --host my-server-host
```

