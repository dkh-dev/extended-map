'use strict'

/* eslint-disable max-statements */

const test = require('tape')

const ExtendedMap = require('..')

test('ExtendedMap', async t => {
  const map = new ExtendedMap([ [ 1, 1 ] ])

  t.plan(8)

  t.equal(map.get(1), 1, 'predefined entries')

  t.equal(map.get(2), void 0)
  t.equal(map.get(2, () => 2), 2, 'get with onUndefined()')
  t.equal(map.get(2), 2)

  t.equal(await map.get('resolves', () => Promise.resolve(3)), 3)
  t.equal(await map.get('resolves'), 3)

  try {
    await map.get('rejects', () => Promise.reject(new Error()))
  } catch (error) {
    t.ok(!map.has('rejects'), 'rejected promises should be deleted')
  }

  t.equal(map.size, 3)
})
