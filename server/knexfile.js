module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'db',
        user: 'emer_sys',
        password: 'xptmxm$123',
        database: 'emergency_system'
      },
      migrations: {
        directory: './migrations'
      },
      seeds: {
        directory: './seeds'
      }
    }
  };
  