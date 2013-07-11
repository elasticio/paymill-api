var _ = require("underscore");
var fs = require("fs");

exports.getMetaModel = function (cfg, cb) {
    var eventType = cfg['event_types'];

    var splitted = eventType.split(".");

    if (splitted.length !== 2) {
        return cb(new Error("Invalid event type: %s", eventType));
    }

    var modelId = splitted[0];

    fs.readFile(__dirname + '/../api-docs.json', function (err, content) {
        if (err) {
            return cb(err);
        }

        var models = JSON.parse(content).models;

        var model = _.find(models, function (model) {
            return model.id === modelId;
        });

        if (model) {
            return cb(null, createMetaModel(model));
        }

        cb();
    });
};

var createMetaModel = function (model) {
    return {
        out: {
            "type": "object",
            "properties": {
                "event": {
                    "type": "object",
                    "properties": {
                        "event_type": {
                            "type": "string",
                            "required": true
                        },
                        "event_resource": model
                    }
                }
            }
        }
    }
};