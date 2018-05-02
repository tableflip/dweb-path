import test from 'ava'
import CID from 'cids'
import dwebPath from '../src'

test('should parse input as string CID', t => {
  const input = 'QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn'
  const path = dwebPath.ipfs(input)

  t.is(path.ns, 'ipfs')
  t.is(path.hash, 'QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')
  t.is(path.path, '')
  t.is(path.toString(), '/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')
  t.is(path.toJSON(), '/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')
})

test('should parse input as buffer CID', t => {
  const input = Buffer.from('017012207252523e6591fb8fe553d67ff55a86f84044b46a3e4176e10c58fa529a4aabd5', 'hex')
  const path = dwebPath.ipfs(input)

  t.is(path.ns, 'ipfs')
  t.is(path.hash, 'zdj7Wd8AMwqnhJGQCbFxBVodGSBG84TM7Hs1rcJuQMwTyfEDS')
  t.is(path.path, '')
  t.is(path.toString(), '/ipfs/zdj7Wd8AMwqnhJGQCbFxBVodGSBG84TM7Hs1rcJuQMwTyfEDS')
  t.is(path.toJSON(), '/ipfs/zdj7Wd8AMwqnhJGQCbFxBVodGSBG84TM7Hs1rcJuQMwTyfEDS')
})

test('should parse input as CID instance', t => {
  const input = new CID('zdpuArHMUAYi3VtD3f7iSkXxYK9xo687SoNf5stAQNCMzd77k')
  const path = dwebPath.ipfs(input)

  t.is(path.ns, 'ipfs')
  t.is(path.hash, 'zdpuArHMUAYi3VtD3f7iSkXxYK9xo687SoNf5stAQNCMzd77k')
  t.is(path.path, '')
  t.is(path.toString(), '/ipfs/zdpuArHMUAYi3VtD3f7iSkXxYK9xo687SoNf5stAQNCMzd77k')
  t.is(path.toJSON(), '/ipfs/zdpuArHMUAYi3VtD3f7iSkXxYK9xo687SoNf5stAQNCMzd77k')
})

test('should parse input as string with path and without namespace', t => {
  const input = 'QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to'
  const path = dwebPath.ipfs(input)

  t.is(path.ns, 'ipfs')
  t.is(path.hash, 'QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')
  t.is(path.path, '/path/to')
  t.is(path.toString(), '/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to')
  t.is(path.toJSON(), '/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to')
})

test('should parse input as string without leading slash', t => {
  const input = 'ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to'
  const path = dwebPath.ipfs(input)

  t.is(path.ns, 'ipfs')
  t.is(path.hash, 'QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')
  t.is(path.path, '/path/to')
  t.is(path.toString(), '/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to')
  t.is(path.toJSON(), '/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to')
})

test('should parse input as string with trailing slash', t => {
  const input = '/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to/'
  const path = dwebPath.ipfs(input)

  t.is(path.ns, 'ipfs')
  t.is(path.hash, 'QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')
  t.is(path.path, '/path/to')
  t.is(path.toString(), '/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to')
  t.is(path.toJSON(), '/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to')
})

test('should not alter CID encoding', t => {
  // base32 encoded CID
  const input = 'bafybeic7rclblnrf76dtmmrdfxix2aq7hnvms5hlb3f7zko52kvv42mb64'
  const path = dwebPath.ipfs(input)

  t.is(path.ns, 'ipfs')
  t.is(path.hash, 'bafybeic7rclblnrf76dtmmrdfxix2aq7hnvms5hlb3f7zko52kvv42mb64')
  t.is(path.path, '')
  t.is(path.toString(), '/ipfs/bafybeic7rclblnrf76dtmmrdfxix2aq7hnvms5hlb3f7zko52kvv42mb64')
  t.is(path.toJSON(), '/ipfs/bafybeic7rclblnrf76dtmmrdfxix2aq7hnvms5hlb3f7zko52kvv42mb64')
})

test('should allow IPNS path', t => {
  const input = '/ipns/yourdomain.name'
  const path = dwebPath.ipfs(input)

  t.is(path.ns, 'ipns')
  t.is(path.hash, 'yourdomain.name')
  t.is(path.path, '')
  t.is(path.toString(), '/ipns/yourdomain.name')
  t.is(path.toJSON(), '/ipns/yourdomain.name')
})

test('should throw on unknown namespace', t => {
  const input = '/junk/stuff'
  t.throws(() => dwebPath.ipfs(input), 'Unknown namespace: junk')
})

test('should throw on invalid CID in string', t => {
  const input = '/ipfs/notACID/some/path'
  t.throws(() => dwebPath.ipfs(input), 'Invalid CID')
})

test('should throw on invalid CID in buffer', t => {
  const input = Buffer.from('notaCID')
  t.throws(() => dwebPath.ipfs(input), 'Invalid CID')
})

test('should throw on invalid path', t => {
  const input = 42
  t.throws(() => dwebPath.ipfs(input), 'Invalid path')
})

test('should only enumerate certain properties', t => {
  const input = 'QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn'
  const path = dwebPath.ipfs(input)
  const enumerable = ['ns', 'path', 'hash']
  t.is(Object.keys(path).length, enumerable.length)
  t.true(Object.keys(path).every(k => enumerable.includes(k)))
})
