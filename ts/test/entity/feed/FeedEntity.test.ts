

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


describe('FeedEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APPLE_WEB_TEST_LIVE=TRUE.
  afterEach(liveDelay('APPLE_WEB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AppleWebSDK.test()
    const ent = testsdk.Feed()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AppleWebSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Feed().load({"headline":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APPLE_WEB_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'feed.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"headline":{"a":true,"h":"Headline","n":"headline","r":true,"sh":"e.g.","t":"`$STRING`","key$":"headline","index$":0},"tiles":{"a":true,"h":"Tiles","n":"tiles","r":true,"t":"`$ARRAY`","key$":"tiles","index$":1}},"name":"feed","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /newsroom/newsroom.everydayfeed.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/newsroom/newsroom.everydayfeed.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"newsroom"},{"lit":"newsroom.everydayfeed.json"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"feed","name__orig":"feed","Name":"Feed","name_":"feed","name-":"feed","NAME":"FEED","index$":1}, {"active":true,"entity":"feed","key$":"BasicFeedFlow","kind":"basic","name":"BasicFeedFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"feed_ref01","srcdatavar":"feed_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-feed_ref01"}}],"index$":0}]}, 'Feed', {"GET /newsroom/newsroom.everydayfeed.json":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let feed_ref01_data = Object.values(setup.data.existing.feed)[0] as any

    // LOAD
    const feed_ref01_ent = client.Feed()
    const feed_ref01_match_dt0: any = {}
    const feed_ref01_data_dt0 = (await feed_ref01_ent.load(feed_ref01_match_dt0)).data()
    assert(null != feed_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/feed/FeedTestData.json')

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
    ['feed01','feed02','feed03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APPLE_WEB_TEST_FEED_ENTID': idmap,
    'APPLE_WEB_TEST_LIVE': 'FALSE',
    'APPLE_WEB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['APPLE_WEB_TEST_FEED_ENTID']

  const live = 'TRUE' === env.APPLE_WEB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APPLE_WEB_TEST_FEED_ENTID']
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
  
