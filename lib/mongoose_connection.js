/**
 * Created by terminate on 1/23/2015.
 */


var mongooseConnection = function (args) {
    var dbHost = args.host || '127.0.0.1',
        dbPort = args.port || 27017,
        dbName = args.name || 'GuitarOnlineStore',
        initialized,
        $mongoose = args.mongoose,
        dbUri = 'mongodb://'+dbHost+':'+dbPort+'/'+dbName;

    var createCon = function(callback){
        if(!initialized){
            initialized = $mongoose.connect(dbUri,callback);
        }
        return initialized;
    };
    var closeCon = function(callback){
        $mongoose.connection.close(callback);
    };

    return {
        createConnection : createCon,
        closeConnection : closeCon
    };

    $mongoose.connection.on('connected', function () {
        console.log('we are connected successfully to the database server');
    });
    $mongoose.connection.on('disconnected', function () {
        console.log('we are disconnected from server');
    });
    $mongoose.connection.on('error', function (err) {
        $mongoose.connection.close();
        console.log(err.message);
    });
    process.on('SIGINT', function () {
        $mongoose.connection.close();
        console.log('we are disconnected from server for application termination');
        process.exit(0);
    });

};

module.exports = mongooseConnection;
