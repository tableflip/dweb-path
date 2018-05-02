# dweb-path

[![Build Status](https://travis-ci.org/tableflip/dweb-path.svg?branch=master)](https://travis-ci.org/tableflip/dweb-path) [![dependencies Status](https://david-dm.org/tableflip/dweb-path/status.svg)](https://david-dm.org/tableflip/dweb-path) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Utility for parsing, validating and inspecting dweb paths

Currently supported path types:

* IPFS
* [PLEASE PR FOR MORE!]

## Install

```sh
npm install dweb-path
```

## Usage

### With IPFS path

```js
const dwebPath = require('dweb-path')
console.log(dwebPath.ipfs('/ipfs/zdpuArHMUAYi3VtD3f7iSkXxYK9xo687SoNf5stAQNCMzd77k/gif'))

// {
//   ns: 'ipfs',
//   hash: 'zdpuArHMUAYi3VtD3f7iSkXxYK9xo687SoNf5stAQNCMzd77k',
//   path: '/gif'
// }
```

## API

### `dwebPath.ipfs(input): { ns, hash, path, toString }`

Parse an `input` as an IPFS path and return an object of it's component parts.

Where `input` can be:

* `String`
    * an IPFS path like `/ipfs/Qmf1JJkBEk7nSdYZJqumJVREE1bMZS7uMm6DQFxRxWShwD/file.txt`
    * an IPNS path like `/ipns/yourdomain.name/file.txt`
    * a CID like `Qmf1JJkBEk7nSdYZJqumJVREE1bMZS7uMm6DQFxRxWShwD`
    * a CID and path like `Qmf1JJkBEk7nSdYZJqumJVREE1bMZS7uMm6DQFxRxWShwD/file.txt`
* [`CID`](https://www.npmjs.com/package/cids) - a CID instance
* `Buffer` - a Buffer CID

Note that for string values, a missing leading forward slash and/or namespace are also accepted as valid paths.

The return value is an object with the following properties:

* `ns: String` - the namespace of the path e.g. "ipfs" or "ipns"
* `hash: String` - the content identifier (the bit after the namespace)
* `path: String` - the path component of the dweb path (the bit after the hash)
* `toString: Function` - (non-enumerable) call this to get the normalized dweb path (missing namespace added and trailing slash removed) as a string
* `toJSON: Function` - (non-enumerable) same return value as `toString`

#### Notes

1. When passing a CID instance or a buffer, `hash` will be encoded as "base58btc" and `ns` set to "ipfs"
2. When passing an IPNS path with a domain name, `hash` will be the domain name


## Contribute

Feel free to dive in! [Open an issue](https://github.com/tableflip/dweb-path/issues/new) or submit PRs.

## License

[MIT](LICENSE) © Alan Shaw
