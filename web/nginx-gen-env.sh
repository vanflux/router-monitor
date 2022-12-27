TARGET="/usr/share/nginx/html/env.js"
rm -f $TARGET || true
echo "window.env = {" >> $TARGET
echo "apiBaseUrl: '${API_BASE_URL:-/api}'" >> $TARGET
echo "};" >> $TARGET
