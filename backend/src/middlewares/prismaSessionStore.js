const session = require("express-session");

class PrismaSessionStore extends session.Store {
  constructor(prisma, options = {}) {
    super();
    this.prisma = prisma;
    this.options = options;
  }

  async get(sid, callback) {
    try {
      const session = await this.prisma.session.findUnique({ where: { id: sid } });
      if (!session) return callback(null, null);

      const parsedData = JSON.parse(session.data);
      callback(null, parsedData);
    } catch (err) {
      callback(err);
    }
  }

  async set(sid, sessionData, callback) {
    try {
      const expires = new Date(Date.now() + (this.options.ttl || 86400000)); // Default TTL: 1 day
      const data = JSON.stringify(sessionData);

      await this.prisma.session.upsert({
        where: { id: sid },
        update: { data, expires },
        create: { id: sid, data, expires },
      });

      callback(null);
    } catch (err) {
      callback(err);
    }
  }

  async destroy(sid, callback) {
    try {
      // Check if the session exists first
      const session = await this.prisma.session.findUnique({
        where: { id: sid },
      });

      if (session) {
        await this.prisma.session.delete({
          where: { id: sid },
        });
      }
      callback(null); // No error if session doesn't exist
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = PrismaSessionStore;
