process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
process.env.COOKIE_NAME = process.env.COOKIE_NAME || 'access_token';
process.env.COOKIE_SECURE = process.env.COOKIE_SECURE || 'false';
process.env.COOKIE_SAME_SITE = process.env.COOKIE_SAME_SITE || 'lax';
process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'error';