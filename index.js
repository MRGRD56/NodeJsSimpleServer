"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
http.createServer(function (req, res) {
    var info = {
        url: undefined,
        parameters: {},
        method: undefined,
        headers: undefined
    };
    var url = req.url; // http://localhost:80?asd=213&erer=3123
    info.url = url;
    info.method = req.method;
    info.headers = req.headers;
    var parametersPartMatch = /\?(.*$)/.exec(url);
    if (parametersPartMatch != null) {
        var parametersPart = parametersPartMatch[1]; // asd=213&erer=3123
        var parametersRegExp = /([^=&]+)\=([^=&]+)/g;
        var parametersRegExpMatch = void 0;
        while (true) {
            parametersRegExpMatch = parametersRegExp.exec(parametersPart);
            if (parametersRegExpMatch === null)
                break;
            var parameter = {
                name: parametersRegExpMatch[1],
                value: parametersRegExpMatch[2]
            };
            info.parameters[parameter.name] = parameter.value;
        }
    }
    res.write(JSON.stringify(info));
    res.end();
}).listen(3000);
//# sourceMappingURL=index.js.map