#!/bin/bash
# start-server.sh

# Ensure the destination directory exists
mkdir -p /app/static/js/

# Attempt to copy the bundle.js file, logging failure
if cp /app/build/* /app/static/js/; then
    echo "Copied bundle.js successfully."
else
    echo "Failed to copy bundle.js. Check that it exists and is readable."
    exit 1 # Exit with an error if the copy fails
fi

# Start gunicorn
exec gunicorn 'app:app' --bind=0.0.0.0:8000
