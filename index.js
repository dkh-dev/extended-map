'use strict'

class ExtendedMap extends Map {
  get(key, onUndefined) {
    if (super.has(key)) {
      return super.get(key)
    }

    if (!onUndefined) {
      return void 0
    }

    const value = onUndefined()

    super.set(key, value)

    if (value && value instanceof Promise) {
      this.promise(key, value)
    }

    return value
  }

  /**
   * Removes the promise if it is rejected.
   *
   * Note: This doesn't silence errors. Errors should be handled manually.
   */
  async promise(key, value) {
    try {
      await value
    } catch (error) {
      if (super.get(key) === value) {
        super.delete(key)
      }
    }
  }
}

module.exports = ExtendedMap
