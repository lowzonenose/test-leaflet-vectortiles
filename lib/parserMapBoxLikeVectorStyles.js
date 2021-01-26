function rgbaToHex (rgba) {
    // number to hex conversion
    function hex (number) {
        if (number > 255) {
            throw new Error("'" + number + "'' is greater than 255(0xff);");
        }
        var str = Number(number).toString(16);
        return ("0" + str).slice(-2);
    }
    var regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(0?.?\d+)\s*)?\)/;
    var parsed = regex.exec(rgba);
    if (!parsed) {
        throw new Error("Invalid format: " + rgba);
    }
    var red = parsed[1];
    var green = parsed[2];
    var blue = parsed[3];
    var alpha = parsed[4];
    var elems = [hex(red), hex(green), hex(blue)];
    var result = {};
    result.hex = "#" + elems.join("");
    if (alpha) {
        // elems.push(hex(alpha));
        result.opacity = parseFloat(alpha);
    }
    return result;
};

function parserMapboxLikeVectorStyles (mapbox, success, fail) {
    fetch(mapbox)
        .then((response) => {
            if (response.ok) {
                response.json()
                    .then((style) => {
                        console.warn(style);
                        var styles = {};
                        for (var i = 0; i < style.layers.length; i++) {
                            var layer = style.layers[i];
                            // objet temp
                            var s = {};
                            // type de geométrie
                            // type implémenté : "line", "fill", "symbol"
                            var t = layer.type;
                            if (t === 'fill') {
                                s.fill = true;
                            }
                            else if (t === "line") {
                                s.stroke = true;
                            }
                            else if (t === "symbol") {
                                // TODO...
                                s.stroke = false;
                            }
                            else if (t === "circle") {
                                // TODO...
                                s.fill = true;
                                s.stroke = true;
                            }
                            else {
                                console.warn("type inconnu ou non géré : ", t, layer.id);
                                continue;
                            }

                            // style
                            var p = layer.paint;
                            for (var key in p) {
                                if (p.hasOwnProperty(key)) {
                                    if (key === "line-color") {
                                        if (typeof p[key] === "object") {
                                            if (p[key].stops) {
                                                // 1ere valeur par defaut
                                                s["color"] = p[key].stops[0][1];
                                            } else {
                                                console.warn("valeur non gérée : ", key, p[key], layer.id);
                                            }
                                        } else {
                                            if (p[key].indexOf("rgba") !== -1) {
                                                var r = rgbaToHex(p[key]);
                                                s["color"] = r.hex;
                                                s["opacity"] = r.opacity;
                                            } else {
                                                s["color"] = p[key];
                                            }
                                        }
                                    } else if (key === "line-width") {
                                        if (typeof p[key] === "object") {
                                            // ex. {"stops": [[12, 1], [13, 0.9], [14, 0.5]]}
                                            if (p[key].stops) {
                                                // 1ere valeur par defaut
                                                s["weight"] = p[key].stops[0][1];
                                            } else {
                                                console.warn("valeur non gérée : ", key, p[key], layer.id);
                                            }
                                        } else {
                                            s["weight"] = p[key];
                                        }
                                    } else if (key === "line-opacity") {
                                        if (typeof p[key] === "object") {
                                            if (p[key].stops) {
                                                // 1ere valeur par defaut
                                                s["opacity"] = p[key].stops[0][1];
                                            } else {
                                                console.warn("valeur non gérée : ", key, p[key], layer.id);
                                            }
                                        } else {
                                            s["opacity"] = p[key];
                                        }
                                    } else if (key === "line-cap") {
                                        s["lineCap"] = p[key].join();
                                    } else if (key === "line-join") {
                                        s["lineJoin"] = p[key].join();
                                    } else if (key === "line-dasharray") {
                                        s["dashArray"] = p[key].join();
                                    } else if (key === "line-dashoffset") {
                                        s["dashOffset"] = p[key].join();
                                    } else if (key === "fill-color") {
                                        if (typeof p[key] === "object") {
                                            if (p[key].stops) {
                                                // 1ere valeur par defaut
                                                s["fillColor"] = p[key].stops[0][1];
                                            } else {
                                                console.warn("valeur non gérée : ", key, p[key], layer.id);
                                            }
                                        } else {
                                            if (p[key].indexOf("rgba") !== -1) {
                                                var r = rgbaToHex(p[key]);
                                                s["fillColor"] = r.hex;
                                                s["fillOpacity"] = r.opacity;
                                            } else {
                                                s["fillColor"] = p[key];
                                            }
                                        }
                                    } else if (key === "fill-opacity") {
                                        if (typeof p[key] === "object") {
                                            if (p[key].stops) {
                                                // 1ere valeur par defaut
                                                s["fillOpacity"] = p[key].stops[0][1];
                                            } else {
                                                console.warn("valeur non gérée : ", key, p[key], layer.id);
                                            }
                                        } else {
                                            s["fillOpacity"] = p[key];
                                        }
                                    } else if (key === "circle-color") {
                                        if (typeof p[key] === "object") {
                                            if (p[key].stops) {
                                                // 1ere valeur par defaut
                                                s["fillColor"] = p[key].stops[0][1];
                                            } else {
                                                console.warn("valeur non gérée : ", key, p[key], layer.id);
                                            }
                                        } else {
                                            if (p[key].indexOf("rgba") !== -1) {
                                                var r = rgbaToHex(p[key]);
                                                s["fillColor"] = r.hex;
                                                s["fillOpacity"] = r.opacity;
                                            } else {
                                                s["fillColor"] = p[key];
                                            }
                                        }
                                    } else if (key === "circle-opacity") {
                                        if (typeof p[key] === "object") {
                                            if (p[key].stops) {
                                                // 1ere valeur par defaut
                                                s["opacity"] = p[key].stops[0][1];
                                            } else {
                                                console.warn("valeur non gérée : ", key, p[key], layer.id);
                                            }
                                        } else {
                                            s["opacity"] = p[key];
                                        }
                                    } else if (key === "circle-stroke-color") {
                                        if (typeof p[key] === "object") {
                                            if (p[key].stops) {
                                                // 1ere valeur par defaut
                                                s["color"] = p[key].stops[0][1];
                                            } else {
                                                console.warn("valeur non gérée : ", key, p[key], layer.id);
                                            }
                                        } else {
                                            if (p[key].indexOf("rgba") !== -1) {
                                                var r = rgbaToHex(p[key]);
                                                s["color"] = r.hex;
                                                s["opacity"] = r.opacity;
                                            } else {
                                                s["color"] = p[key];
                                            }
                                        }
                                        s["color"] = p[key];
                                    } else if (key === "circle-stroke-width") {
                                        if (typeof p[key] === "object") {
                                            // ex. {"stops": [[12, 1], [13, 0.9], [14, 0.5]]}
                                            if (p[key].stops) {
                                                // 1ere valeur par defaut
                                                s["weight"] = p[key].stops[0][1];
                                            } else {
                                                console.warn("valeur non gérée : ", key, p[key], layer.id);
                                            }
                                        } else {
                                            s["weight"] = p[key];
                                        }
                                    } else if (key === "circle-radius") {
                                        if (typeof p[key] === "object") {
                                            // ex. {"stops": [[12, 1], [13, 0.9], [14, 0.5]]}
                                            if (p[key].stops) {
                                                // 1ere valeur par defaut
                                                s["radius"] = p[key].stops[0][1];
                                            } else {
                                                console.warn("valeur non gérée : ", key, p[key], layer.id);
                                            }
                                        } else {
                                            s["radius"] = p[key];
                                        }
                                    } else if (
                                        key === "line-translate" ||
                                        key === "fill-pattern" ||
                                        key === "fill-outline-color" ||
                                        key === "text-color" ||
                                        key === "text-halo-color" ||
                                        key === "text-halo-width" ||
                                        key === "icon-color") {
                                        console.warn("not yet implemented : ", key, layer.id);
                                        // continue;
                                    } else {
                                        console.warn("clef inconnus : ", key, layer.id);
                                        // continue;
                                    }
                                }
                            }

                            // sauvegarde des informations init.
                            s.layer = layer;
                            // ID
                            var id = layer["source-layer"];
                            // enregistrement : simple ou liste de styles
                            if (styles[id]) {
                                // TODO le style existe déjà...
                                // il faut mettre en place une fonction dynamique
                                // en fonction des filtres, et du zoom...
                                // ex.
                                // transport_lines: function(properties, zoom) {
                                //     var type = properties.type;
                                //     if (type == "trail") {weight = 4;}
                                //     if (type == "road") {weight = 8;}
                                //     return {
                                //         weight : weight
                                //     }
                                // },
                                console.warn("styles en doublon : ", layer.id);
                                var oldstyle = styles[id];
                                var newstyle = s;
                                if (!Array.isArray(oldstyle)) {
                                    var cloneoldstyle = JSON.parse(JSON.stringify(oldstyle));
                                    styles[id] = [];
                                    styles[id].push(cloneoldstyle);
                                } 
                                styles[id].push(newstyle);
                            } else {
                                styles[id] = s;
                            }
                        }
                        return styles;
                    })
                    .then((data) => {
                        success(data);
                        return data;
                    })
                    .catch((error) => {
                        // to do stuff...
                        fail(error);
                        return error;
                    });
            } else {
                // to do stuff...
                return;
            }
        })
        .catch((error) => {
            // to do stuff...
            return error;
        });
};
