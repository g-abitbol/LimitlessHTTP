
var anim = require('../LimitlessANIM/index').init({ host: '10.10.100.254' }),
	restify = require('restify'),
	logger = require('log4js').getLogger();

var server = restify.createServer({
    name: 'LimitlessHTTP',
});

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url)
});
server.use(restify.bodyParser())

server.post('/start', function create(req, res, next) {
	logger.info('LimitlessHTTP : START');

    anim.reset();
    anim.start();
    if (req.params.color !== undefined) {
        anim.color(req.params.color);
    }
    anim.fade('in');
    anim.run();
    res.send(200);
});


server.post('/stop', function create(req, res, next) {
	logger.info('LimitlessHTTP : STOP');

    anim.reset();
    if (req.params.color !== undefined) {
        anim.color(req.params.color);
    }
    anim.fade('out');
    anim.stop();
    anim.run();
    res.send(200);
});

server.post('/set', function create(req, res, next) {
    anim.reset();
    anim.color(req.params.color);
    anim.run();
    res.send(200);
});

server.post('/mset', function create(req, res, next) {
    anim.reset();
    anim.mcolor(req.params.color);
    anim.repeat(req.params.repeat);
    anim.run();
    res.send(200);
});

server.post('/glow', function create(req, res, next) {
    anim.reset();
    if (req.params.color !== undefined) {
        anim.color(req.params.color);
    }
    anim.fade('in');
	anim.repeat(req.params.repeat);
    anim.run();
    res.send(200);
});


