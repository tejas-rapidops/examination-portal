module.exports = {
  apps : [{
    name: 'API',
    script: 'app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_dev: {
      NODE_ENV: 'dev'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy : {
    dev : {
      user : 'examination-portal',
      host : '52.0.219.227',
      ref  : 'origin/development',
      repo : 'git@github.com:tejas-rapidops/examination-portal.git',
      path : '/home/examination',
      'pre-deploy-local':'npm run build',
      'post-deploy' : 'pm2 deploy dev setup && pm2 startOrRestart ecosystem.config.js --env dev'
    },
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'pm2 kill && npm install && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
};
