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

const map = new ExtendedMap([ [ 1, 1 ] ])

const main = async () => {
  console.log(map.get(1))
  console.log(map.get(2))
  console.log(map.get(2, () => 2))
  console.log(map.get(2))
  console.log(await map.get('resolves', () => Promise.resolve(3)))
  console.log(await map.get('resolves'))

  try {
    await map.get('rejects', () => Promise.reject(new Error()))
  } catch (error) {
    // rejected promises are deleted
    console.log(map.has('rejects'))
  }

  console.log(map)

  // => 1
  //    undefined
  //    2
  //    2
  //    4
  //    4
  //    false
  //    ExtendedMap(3) [Map] { 1 => 1, 2 => 2, 'resolves' => Promise { 3 } }
}

main()
```
