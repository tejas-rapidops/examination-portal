module.exports = {
  apps : [{
    name: 'API',
    script: 'npm start'
  }],
  deploy : {
    dev : {
      user : 'examination-portal',
      host : '52.0.219.227',
      ref  : 'origin/development',
      repo : 'https://github.com/tejas-rapidops/examination-portal.git',
      path : '/home/examination-portal',
      'post-deploy' : 'cd /home/examination-portal/current && npm install && pm2 start ecosystem.config.js --env dev',
      env: {
        NODE_ENV: 'dev',
      },
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
