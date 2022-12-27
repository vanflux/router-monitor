const fs = require('fs');
if (!fs.existsSync('.env') && fs.existsSync('env-example')) {
  fs.copyFileSync('env-example', '.env');
}
