module.exports = {
  apps: [
    {
      name: 'nest-admin',
      script: './dist/main.js',
      instances: 'max',
      autorestart: true,
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.APP_PORT
      }
    }
  ]
}
