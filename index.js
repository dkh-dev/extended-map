'use strict'

class ExtendedMap extends Map {
    constructor(entries) {
        super(entries)
    }

    get(key, onUndefined) {
        if (super.has(key)) {
            return super.get(key)
        }

        if (!onUndefined) {
            return
        }

        const value = onUndefined()

        super.set(key, value)

        return value
    }

    set(key, value) {
        if (super.has(key)) {
            // Sorts entries by last modified time
            super.delete(key)
        } else if (this.max && super.size >= this.max) {
            const keys = super.keys()
            const { value: key } = keys.next()

            super.delete(key)
        }

        return super.set(key, value)
    }

    limit(max) {
        this.max = max

        return this
    }
}

module.exports = ExtendedMap
