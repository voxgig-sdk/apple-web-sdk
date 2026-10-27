

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


describe('ProductPriceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APPLE_WEB_TEST_LIVE=TRUE.
  afterEach(liveDelay('APPLE_WEB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AppleWebSDK.test()
    const ent = testsdk.ProductPrice()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AppleWebSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ProductPrice().load({"country":1,"part":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APPLE_WEB_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'product_price.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"baseName":{"a":true,"h":"Base Name","n":"baseName","r":false,"t":"`$STRING`","key$":"baseName","index$":0},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Part number, e.g.","t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":2},"price":{"a":true,"h":"Price","n":"price","r":false,"t":"`$OBJECT`","key$":"price","index$":3},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"`PART` for a known part; `UNKNOWN` when the part number is not sold in this store (then only `id` and `type` are present).","t":"`$STRING`","key$":"type","index$":4}},"id":{"field":"id","name":"id"},"name":"product_price","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /{country}/shop/mcm/product-price","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"us","k":"param","n":"country","or":"country","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"MX2D3AM/A","k":"query","n":"part","or":"parts","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/{country}/shop/mcm/product-price","q":{"exist":["country","part"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"var":"country"},{"lit":"shop"},{"lit":"mcm"},{"lit":"product-price"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"product_price","name__orig":"product_price","Name":"ProductPrice","name_":"product_price","name-":"product-price","NAME":"PRODUCT_PRICE","index$":4}, {"active":true,"entity":"product_price","key$":"BasicProductPriceFlow","kind":"basic","name":"BasicProductPriceFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"product_price_ref01","srcdatavar":"product_price_ref01_data","suffix":"_dt0"},"m":{"id":"product_price01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-product_price_ref01"}}],"unreachable":true}]}, 'ProductPrice', {"GET /{country}/shop/mcm/product-price":{"protocol":"http","parameters":[{"name":"country","in":"path","required":true,"description":"Store country path segment, e.g. `us`, `uk`.","schema":{"type":"string"},"example":"us","index$":0},{"name":"parts","in":"query","required":true,"description":"Comma-separated part numbers.","schema":{"type":"string"},"example":"MX2D3AM/A","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let product_price_ref01_data = Object.values(setup.data.existing.product_price)[0] as any

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
      '../../../../.sdk/test/entity/product_price/ProductPriceTestData.json')

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
    ['product_price01','product_price02','product_price03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APPLE_WEB_TEST_PRODUCT_PRICE_ENTID': idmap,
    'APPLE_WEB_TEST_LIVE': 'FALSE',
    'APPLE_WEB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['APPLE_WEB_TEST_PRODUCT_PRICE_ENTID']

  const live = 'TRUE' === env.APPLE_WEB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APPLE_WEB_TEST_PRODUCT_PRICE_ENTID']
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
  
