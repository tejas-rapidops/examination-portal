module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   * pm2 deploy ecosystem.config.js dev setup
   * pm2 deploy ecosystem.config.js dev update
   * pm2 deploy dev update
   * pm2 deploy dev exec "pm2 restart all"
   */
  apps: [
    {
      name: 'development',
      script: 'index.js',
      exec_mode: 'fork',
    },
    {
      name: 'qa',
      script: 'index.js',
      exec_mode: 'cluster',
    },
    {
      name: 'production',
      script: 'index.js',
      exec_mode: 'cluster',
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    dev: {
      name: 'development',
      user: 'examination-portal',
      host: '52.0.219.227',
      ref: 'origin/development',
      repo: 'git@github.com:tejas-rapidops/examination-portal.git',
      path: '/home/krogerfresh/app',
      'pre-deploy-local': '',
      'post-deploy': 'cd /home/krogerfresh/app/current; ' +
        'kill -9 $(/usr/sbin/lsof -t -i:9005 -sTCP:LISTEN); ' +
        'pkill node; ' +
        'npm install --only=production; ' +
        'NODE_ENV=dev node --inspect=172.31.1.84:4444 index.js > log.txt &',
      env: {
        NODE_ENV: 'dev',
      },
    },
    qa: {
      name: 'qa',
      user: 'examination-portal',
      host: '52.0.219.227',
      ref: 'origin/qa-build',
      repo: 'git@github.com:tejas-rapidops/examination-portal.git',
      path: '/home/examination-portal',
      'post-deploy': 'cd /home/krogerfresh/app/current; ' +
        'kill -9 $(/usr/sbin/lsof -t -i:9005 -sTCP:LISTEN); ' +
        'pkill node; ' +
        'npm install --only=production; ' +
        'NODE_ENV=qa node --inspect=172.31.1.84:4444 index.js > log.txt &',
      env: {
        NODE_ENV: 'qa',
      },
    },
    production: {
      name: 'production',
      user: 'examination-portal',
      host: '52.0.219.227',
      ref: 'origin/production-build',
      repo: 'git@github.com:tejas-rapidops/examination-portal.git',
      path: '/home/examination-portal',
      'post-deploy': 'cd /home/krogerfresh/app/current; ' +
        'kill -9 $(/usr/sbin/lsof -t -i:9002 -sTCP:LISTEN); ' +
        'pkill node; ' +
        'npm install --only=production; ' +
        'NODE_ENV=production node --inspect=172.31.1.84:4444 index.js > log.txt &',
      env: {
        NODE_ENV: 'production',
      },
    }
  },
};


