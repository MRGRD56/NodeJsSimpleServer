import * as http from "http";

http.createServer((req, res) => {
    const info = {
        url: undefined,
        method: undefined,
        parameters: {},
        headers: undefined
    };

    info.url = req.url;
    info.method = req.method;
    info.headers = req.headers;
    const parametersPartMatch = /\?(.*$)/.exec(req.url);

    if (parametersPartMatch != null) {
        const parametersPart = parametersPartMatch[1]; // asd=213&erer=3123
        const parametersRegExp = /([^=&]+)=([^=&]+)/g;
        let parametersRegExpMatch: RegExpExecArray;
        while (true) {
            parametersRegExpMatch = parametersRegExp.exec(parametersPart);
            if (parametersRegExpMatch === null) break;

            const parameter = {
                name: parametersRegExpMatch[1],
                value: parametersRegExpMatch[2]
            };
            info.parameters[parameter.name] = parameter.value;
        }
    }

    res.write(JSON.stringify(info));
    res.end();
}).listen(3000)