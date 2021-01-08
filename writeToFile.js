const newman = require('newman'); // require newman in your project
const fs = require('fs');

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('./collection.json'),
    reporters: 'cli'
}).on('beforeRequest', (error, data) => {
    if (error) {
        console.log(error);
        return;
    }

    if (data.request.body) {
        const requestName = data.item.name.replace(/[^a-z0-9]/gi, '-');
        const randomString = Math.random().toString(36).substring(7);
        const fileName = `request-${requestName}-${randomString}.txt`;
        const content = data.request.body.raw;
        
        fs.writeFile(fileName, content, function (error) {
            if (error) { 
                 console.error(error); 
            }
         });        
    }
})
.on('request', (error, data) => {
    if (error) {
        console.log(error);
        return;
    }

    const requestName = data.item.name.replace(/[^a-z0-9]/gi, '-');
    const randomString = Math.random().toString(36).substring(7);
    const fileName = `response-${requestName}-${randomString}.txt`;
    const content = data.response.stream.toString();
    
    fs.writeFile(fileName, content, function (error) {
        if (error) { 
             console.error(error); 
        }
     });

     /// TODO: all global error handling
});
