
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AppleWebSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AppleWebSDK.test()
    equal(testsdk instanceof AppleWebSDK, true,
      'AppleWebSDK.test() must return a client synchronously')
  })

})
