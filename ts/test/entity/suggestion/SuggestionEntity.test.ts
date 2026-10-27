

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AppleWebSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('SuggestionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APPLE_WEB_TEST_LIVE=TRUE.
  afterEach(liveDelay('APPLE_WEB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AppleWebSDK.test()
    const ent = testsdk.Suggestion()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('suggestion hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of AppleWebSDK.test(offline).Suggestion().stream('list')) { }
    }, /offline/)

    for await (const _item of AppleWebSDK.test(offline).Suggestion()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = AppleWebSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Suggestion().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of AppleWebSDK.test().Suggestion().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new AppleWebSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Suggestion().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Suggestion().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AppleWebSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Suggestion().list({"locale":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APPLE_WEB_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'suggestion.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"suggestion","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /search-services/suggestions/defaultlinks/","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"en_US","k":"query","n":"locale","or":"locale","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"globalnav","k":"query","n":"src","or":"src","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/search-services/suggestions/defaultlinks/","q":{"$action":"defaultlink"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"search-services"},{"lit":"suggestions"},{"lit":"defaultlinks"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"suggestion","name__orig":"suggestion","Name":"Suggestion","name_":"suggestion","name-":"suggestion","NAME":"SUGGESTION","index$":5}, {"active":true,"entity":"suggestion","key$":"BasicSuggestionFlow","kind":"basic","name":"BasicSuggestionFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"suggestion_ref01"}}],"index$":0}]}, 'Suggestion', {"GET /search-services/suggestions/defaultlinks/":{"protocol":"http","parameters":[{"name":"src","in":"query","required":false,"description":"Calling surface; the site sends `globalnav`.","schema":{"type":"string"},"example":"globalnav","index$":0},{"name":"locale","in":"query","required":false,"description":"Locale in `ll_CC` form, e.g. `en_US`, `fr_FR`.","schema":{"type":"string"},"example":"en_US","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let suggestion_ref01_data = Object.values(setup.data.existing.suggestion)[0] as any

    // LIST
    const suggestion_ref01_ent = client.Suggestion()
    const suggestion_ref01_match: any = {}

    const suggestion_ref01_list = (await suggestion_ref01_ent.list(suggestion_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/suggestion/SuggestionTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AppleWebSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['suggestion01','suggestion02','suggestion03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APPLE_WEB_TEST_SUGGESTION_ENTID': idmap,
    'APPLE_WEB_TEST_LIVE': 'FALSE',
    'APPLE_WEB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['APPLE_WEB_TEST_SUGGESTION_ENTID']

  const live = 'TRUE' === env.APPLE_WEB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APPLE_WEB_TEST_SUGGESTION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AppleWebSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.APPLE_WEB_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
