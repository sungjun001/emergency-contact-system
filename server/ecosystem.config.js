module.exports = {
    apps: [{
      name: "emergency-system-server",
      script: "./server.js",
      instances: "max",
      exec_mode: "cluster"
    }]
  }
  