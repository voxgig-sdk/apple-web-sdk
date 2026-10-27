

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


describe('ArticlecategoryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APPLE_WEB_TEST_LIVE=TRUE.
  afterEach(liveDelay('APPLE_WEB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AppleWebSDK.test()
    const ent = testsdk.Articlecategory()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AppleWebSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Articlecategory().list({"category":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APPLE_WEB_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'articlecategory.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"category":{"a":true,"h":"Category","n":"category","r":true,"sh":"e.g.","t":"`$STRING`","key$":"category","index$":0},"date":{"a":true,"h":"Date","n":"date","r":true,"sh":"Display date, e.g.","t":"`$STRING`","key$":"date","index$":1},"description":{"a":true,"h":"Description","n":"description","r":true,"t":"`$STRING`","key$":"description","index$":2},"image":{"a":true,"h":"Image","n":"image","r":true,"sh":"Tile images by layout.","t":"`$OBJECT`","key$":"image","index$":3},"link":{"a":true,"h":"Link","n":"link","r":true,"sh":"Absolute article URL.","t":"`$STRING`","key$":"link","index$":4},"publishedTime":{"a":true,"fo":"int64","h":"Published Time","n":"publishedTime","r":true,"sh":"Publication time in epoch milliseconds.","t":"`$INTEGER`","key$":"publishedTime","index$":5},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":6}},"name":"articlecategory","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /newsroom/article.{category}.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"photos","k":"param","n":"category","or":"category","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/newsroom/article.{category}.json","q":{"exist":["category"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"newsroom"},{"lit":"article.{category}.json"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"articlecategory","name__orig":"articlecategory","Name":"Articlecategory","name_":"articlecategory","name-":"articlecategory","NAME":"ARTICLECATEGORY","index$":0}, {"active":true,"entity":"articlecategory","key$":"BasicArticlecategoryFlow","kind":"basic","name":"BasicArticlecategoryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"category":"category01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"articlecategory_ref01"}}],"index$":0}]}, 'Articlecategory', {"GET /newsroom/article.{category}.json":{"protocol":"http","parameters":[{"name":"category","in":"path","required":true,"description":"Lower-case category, e.g. `photos`, `update`.","schema":{"type":"string"},"example":"photos","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let articlecategory_ref01_data = Object.values(setup.data.existing.articlecategory)[0] as any

    // LIST
    const articlecategory_ref01_ent = client.Articlecategory()
    const articlecategory_ref01_match: any = {}
    articlecategory_ref01_match['category'] = setup.idmap['category01']

    const articlecategory_ref01_list = (await articlecategory_ref01_ent.list(articlecategory_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/articlecategory/ArticlecategoryTestData.json')

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
    ['articlecategory01','articlecategory02','articlecategory03','category01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APPLE_WEB_TEST_ARTICLECATEGORY_ENTID': idmap,
    'APPLE_WEB_TEST_LIVE': 'FALSE',
    'APPLE_WEB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['APPLE_WEB_TEST_ARTICLECATEGORY_ENTID']

  const live = 'TRUE' === env.APPLE_WEB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APPLE_WEB_TEST_ARTICLECATEGORY_ENTID']
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
  
