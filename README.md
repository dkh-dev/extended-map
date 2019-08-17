# ExtendedMap

_Map with extended functionality_

## Installation

```bash
$ npm install @dkh-dev/extended-map
```

## Example

```javascript
'use strict'

const ExtendedMap = require('@dkh-dev/extended-map')

const map = new ExtendedMap([ [ 1, 1 ] ]).limit(3)

console.log(map.get(1))
console.log(map.get(2))
console.log(map.get(2, () => 2))
console.log(map.get(2))
console.log(map.set(3, 3).set(1, 1).set(4, 4))
// => 1
//    undefined
//    2
//    2
//    ExtendedMap [Map] { 3 => 3, 1 => 1, 4 => 4, max: 3 }
```
