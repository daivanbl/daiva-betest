module.exports = (app) => {
    const api = '/api',
        authRoute = require('./auth.route');
        userRoute = require('./user.route');

    app.use(`${api}/auth`, authRoute);
    app.use(`${api}/user`, userRoute);
};