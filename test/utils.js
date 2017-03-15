import test from 'ava'

import { retrieveDeep } from '../lib'

test('retrieveDeep', t => {
  const deletePaths = retrieveDeep({
    '0': {
      '01': DELETE_PREFIX,
      '02': {
        '020': DELETE_PREFIX
      }
    },
    '1': {
      '10': {
        '100': DELETE_PREFIX
      },
      '11': DELETE_PREFIX
    }
  })
  t.is(deletePaths.toString(), [ [ '0', '01' ],
  [ '0', '02', '020' ],
  [ '1', '10', '100' ],
  [ '1', '11' ] ].toString())
})
