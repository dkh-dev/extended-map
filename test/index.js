'use strict'

const ExtendedMap = require('..')

const map = new ExtendedMap([ [ 1, 1 ] ]).limit(3)

const main = async () => {
    console.log(map.get(1))
    console.log(map.get(2))
    console.log(map.get(2, () => 2))
    console.log(map.get(2))
    console.log(await map.get('resolve', () => Promise.resolve(4)))
    console.log(await map.get('resolve'))

    // rejected promises are deleted

    try {
        await map.get('reject', () => Promise.reject(5))
    } catch (error) {
        console.log(error)
    }

    try {
        await map.get('reject', () => Promise.reject(6))
    } catch (error) {
        console.log(error)
    }

    console.log(map.set(3, 3).set(1, 1).set(4, 4))
    // => 1
    //    undefined
    //    2
    //    2
    //    4
    //    4
    //    5
    //    6
    //    ExtendedMap [Map] { 3 => 3, 1 => 1, 4 => 4, max: 3 }
}

main()
