var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/push', secret: '199453xxw' })
 
function run_cmd(cmd, args, callback) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
    child.stdout.on('end', function() { callback (resp) });
}

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location !')
    })
}).listen(8080,()=>{
    console.log("webhook listen at 8080 port!")
})
 
handler.on('error', function (err) {
    console.error('Error:', err.message);
})
 
handler.on('push', function (event) {
    console.log(event.payload)
    switch(event.payload.repository.name)
    {
        case 'blog':
            //this push event is from my persional github account, as SAP github.tool's github hook do not work, so I use this one to test push event
            console.log("reveive a push event from blog");
            run_cmd('sh', ['./deploy.sh'], function(text){ console.log(text) });
            break;
    }
})
 
handler.on('issues', function (event) {
    console.log('Received an issue event for %s action=%s: #%d %s',
        event.payload.repository.name,
        event.payload.action,
        event.payload.issue.number,
        event.payload.issue.title);
})