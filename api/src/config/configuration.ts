export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  tz: process.env.TZ || 'America/Sao_Paulo',
  db: {
    uri: process.env.DB_URI || 'mongodb://user:pass@localhost:27017',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'jwt-secret',
  },
  admin: {
    user: process.env.ADMIN_USER || 'admin',
    pass: process.env.ADMIN_PASS || 'admin',
  },
});
