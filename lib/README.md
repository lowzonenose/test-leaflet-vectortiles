# Parser for mapbox-like vector stylesheets

## Faire un switch entre les 2 objets

```json
// mapbox vector stylesheets
{
    "id":"landuse_park",
    "type":"fill",
    "source":"mapbox",
    "source-layer":"landuse",
    "filter":[
        "==",
        "class",
        "park"
    ],
    "paint":{
        "fill-color":"#d8e8c8",
        "fill-opacity":1
    }
},
```

vers

```json
// A plain set of L.Path options.
// https://leafletjs.com/reference-1.5.0.html#path
landuse_park: {
    "fillColor": "#d8e8c8",
    "fillOpacity": 1,
    "fill": false
},
```

## Equivalence MapBox -> L.Path

    stroke:true <=> "type":"line"
    fill:true <=> "type":"fill"
    ??? <=> "type":"symbol"
    ??? <=> "type":"circle"
    ??? <=> "type":"background"

    color <=> line-color avec conversion "rgba(0, 0, 0, 1)" to "#000000"
    weight <=> line-width avec conversion "{"stops": [[14, 1], [17, 2.5]]}" to "1" ou "2.5"
    lineCap <=> line-cap
    lineJoin <=> line-join
    dashArray <=> line-dasharray  : conversion "[array]" to "string"
    dashOffset <=>  ???

    fillColor <=> fill-color avec conversion "rgba(0, 0, 0, 1)" to "#000000"
    fillOpacity <=> fill-opacity avec conversion "{"stops": [[14, 1], [17, 2.5]]}" to "1" ou "2.5"
    fillRule <=> ???

**Remarques:**

Le texte ou/et icone : cf. http://www.coffeegnome.net/labels-in-leaflet/

```js
// An 'icon' option means that a L.Icon will be used
place: {
    icon: new L.Icon.Default()
}
```

## JS

```js
parserMapboxLikeVectorStyles("osm.json", (data) => {
    console.log(data);
});
```
**Exemple de conversion MapBox -> L.Path**

```
0:
    filter: Array(2)
        0: "all"
        1: (3) ["==", "admin_level", 4]
        length: 2
    id: "state_lines_10"
    layout: {visibility: "visible"}
    maxzoom: 20
    minzoom: 10
    paint:
        line-color: "rgba(240, 240, 241, 1)"
        line-dasharray: (2) [6, 3]
        line-width:
            stops: Array(3)
                0: (2) [2.5, 0.4]
                1: (2) [3, 1]
                2: (2) [4, 1.5]
    source: "osm"
    source-layer: "admin_lines"
    type: "line"
1:
    filter: Array(2)
        0: "all"
        1: (3) ["==", "admin_level", 2]
    id: "admin_countrylines_z10"
    layout: {visibility: "visible"}
    maxzoom: 20
    minzoom: 10
    paint:
        line-color: "rgba(0, 58, 64, 1)"
        line-width: 2
    source: "osm"
    source-layer: "admin_lines"
    type: "line"
```
==>
```
Object
admin_lines: Array(2)
    0:
        color: "#f0f0f1"
        dashArray: "6,3"
        layer: {id: "state_lines_10", type: "line", source: "osm", source-layer: "admin_lines", minzoom: 10, …}
        opacity: 1
        stroke: true
        weight: 0.4
    1:
        color: "#003a40"
        layer: {id: "admin_countrylines_z10", type: "line", source: "osm", source-layer: "admin_lines", minzoom: 10, …}
        opacity: 1
        stroke: true
        weight: 2
```

## TODOLIST

* rendu du texte
* rendu d'un icone
* rendu du background
* rendu d'un circle
* ameliorer le rendu des données en fonction du zoom & du filtre
* ameliorer la popup d'information
