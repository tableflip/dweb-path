const CID = require('cids')
const MultiBase = require('multibase')
const explain = require('explain-error')
const isDomainName = require('is-domain-name')

module.exports = input => {
  let ns, hash, path

  if (Buffer.isBuffer(input) || CID.isCID(input)) {
    try {
      hash = new CID(input).toBaseEncodedString()
    } catch (err) {
      throw explain(err, 'Invalid CID')
    }

    ns = 'ipfs'
    path = ''
  } else if (Object.prototype.toString.call(input) === '[object String]') {
    // Ensure leading slash
    if (input[0] !== '/') {
      input = `/${input}`
    }

    // Remove trailing slash
    if (input[input.length - 1] === '/') {
      input = input.slice(0, -1)
    }

    const parts = input.split('/')

    if (parts[1] === 'ipfs' || parts[1] === 'ipns') {
      try {
        hash = strToCidToStr(parts[2])
      } catch (err) {
        // If IPNS then this could be a domain name
        if (parts[1] === 'ipns' && isDomainName(parts[2])) {
          hash = parts[2]
        } else {
          throw explain(err, 'Invalid CID')
        }
      }

      ns = parts[1]
      path = parts.slice(3).join('/')
    } else {
      // Is parts[1] a CID?
      try {
        hash = strToCidToStr(parts[1])
      } catch (err) {
        throw new Error(`Unknown namespace: ${parts[1]}`)
      }

      ns = 'ipfs'
      path = parts.slice(2).join('/')
    }

    // Ensure leading slash on non empty path
    if (path.length) {
      path = `/${path}`
    }
  } else {
    throw new Error('Invalid path') // What even is this?
  }

  const toString = () => `/${ns}/${hash}${path}`

  return Object.defineProperties({}, {
    ns: { value: ns, enumerable: true },
    hash: { value: hash, enumerable: true },
    path: { value: path, enumerable: true },
    toString: { value: toString },
    toJSON: { value: toString }
  })
}

function strToCidToStr (str) {
  return new CID(str).toBaseEncodedString(MultiBase.isEncoded(str) || 'base58btc')
}
