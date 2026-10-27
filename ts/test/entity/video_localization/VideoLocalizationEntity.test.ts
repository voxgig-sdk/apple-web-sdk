

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


describe('VideoLocalizationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APPLE_WEB_TEST_LIVE=TRUE.
  afterEach(liveDelay('APPLE_WEB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AppleWebSDK.test()
    const ent = testsdk.VideoLocalization()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AppleWebSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VideoLocalization().load({"locale":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APPLE_WEB_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'video_localization.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"adjustvolume":{"a":true,"h":"Adjustvolume","n":"adjustvolume","r":false,"t":"`$STRING`","key$":"adjustvolume","index$":0},"airplay":{"a":true,"h":"Airplay","n":"airplay","r":false,"t":"`$STRING`","key$":"airplay","index$":1},"audiotrack":{"a":true,"h":"Audiotrack","n":"audiotrack","r":false,"t":"`$STRING`","key$":"audiotrack","index$":2},"audiotrackscontrol":{"a":true,"h":"Audiotrackscontrol","n":"audiotrackscontrol","r":false,"t":"`$STRING`","key$":"audiotrackscontrol","index$":3},"back":{"a":true,"h":"Back","n":"back","r":false,"t":"`$STRING`","key$":"back","index$":4},"captionscontrol":{"a":true,"h":"Captionscontrol","n":"captionscontrol","r":false,"t":"`$STRING`","key$":"captionscontrol","index$":5},"captionsoff":{"a":true,"h":"Captionsoff","n":"captionsoff","r":false,"t":"`$STRING`","key$":"captionsoff","index$":6},"captionsturnedoff":{"a":true,"h":"Captionsturnedoff","n":"captionsturnedoff","r":false,"t":"`$STRING`","key$":"captionsturnedoff","index$":7},"captionsturnedon":{"a":true,"h":"Captionsturnedon","n":"captionsturnedon","r":false,"t":"`$STRING`","key$":"captionsturnedon","index$":8},"chapter":{"a":true,"h":"Chapter","n":"chapter","r":false,"t":"`$STRING`","key$":"chapter","index$":9},"chapters":{"a":true,"h":"Chapters","n":"chapters","r":false,"t":"`$STRING`","key$":"chapters","index$":10},"close":{"a":true,"h":"Close","n":"close","r":false,"t":"`$STRING`","key$":"close","index$":11},"closesharing":{"a":true,"h":"Closesharing","n":"closesharing","r":false,"t":"`$STRING`","key$":"closesharing","index$":12},"copyarea":{"a":true,"h":"Copyarea","n":"copyarea","r":false,"t":"`$STRING`","key$":"copyarea","index$":13},"copyembed":{"a":true,"h":"Copyembed","n":"copyembed","r":false,"t":"`$STRING`","key$":"copyembed","index$":14},"copylink":{"a":true,"h":"Copylink","n":"copylink","r":false,"t":"`$STRING`","key$":"copylink","index$":15},"currenttimetext":{"a":true,"h":"Currenttimetext","n":"currenttimetext","r":false,"t":"`$STRING`","key$":"currenttimetext","index$":16},"dismisscopy":{"a":true,"h":"Dismisscopy","n":"dismisscopy","r":false,"t":"`$STRING`","key$":"dismisscopy","index$":17},"elapsed":{"a":true,"h":"Elapsed","n":"elapsed","r":false,"t":"`$STRING`","key$":"elapsed","index$":18},"error":{"a":true,"h":"Error","n":"error","r":false,"t":"`$STRING`","key$":"error","index$":19},"exitfullscreen":{"a":true,"h":"Exitfullscreen","n":"exitfullscreen","r":false,"t":"`$STRING`","key$":"exitfullscreen","index$":20},"exitpictureinpicture":{"a":true,"h":"Exitpictureinpicture","n":"exitpictureinpicture","r":false,"t":"`$STRING`","key$":"exitpictureinpicture","index$":21},"facebookshare":{"a":true,"h":"Facebookshare","n":"facebookshare","r":false,"t":"`$STRING`","key$":"facebookshare","index$":22},"fullscreen":{"a":true,"h":"Fullscreen","n":"fullscreen","r":false,"t":"`$STRING`","key$":"fullscreen","index$":23},"jumptochapter":{"a":true,"h":"Jumptochapter","n":"jumptochapter","r":false,"t":"`$STRING`","key$":"jumptochapter","index$":24},"language":{"a":true,"h":"Language","n":"language","r":false,"t":"`$STRING`","key$":"language","index$":25},"live":{"a":true,"h":"Live","n":"live","r":false,"t":"`$STRING`","key$":"live","index$":26},"livestream":{"a":true,"h":"Livestream","n":"livestream","r":false,"t":"`$STRING`","key$":"livestream","index$":27},"loading":{"a":true,"h":"Loading","n":"loading","r":false,"t":"`$STRING`","key$":"loading","index$":28},"minutesandseconds":{"a":true,"h":"Minutesandseconds","n":"minutesandseconds","r":false,"t":"`$STRING`","key$":"minutesandseconds","index$":29},"mutevolume":{"a":true,"h":"Mutevolume","n":"mutevolume","r":false,"t":"`$STRING`","key$":"mutevolume","index$":30},"newwindow":{"a":true,"h":"Newwindow","n":"newwindow","r":false,"t":"`$STRING`","key$":"newwindow","index$":31},"pause":{"a":true,"h":"Pause","n":"pause","r":false,"t":"`$STRING`","key$":"pause","index$":32},"pictureinpicture":{"a":true,"h":"Pictureinpicture","n":"pictureinpicture","r":false,"t":"`$STRING`","key$":"pictureinpicture","index$":33},"play":{"a":true,"h":"Play","n":"play","r":false,"t":"`$STRING`","key$":"play","index$":34},"playpause":{"a":true,"h":"Playpause","n":"playpause","r":false,"t":"`$STRING`","key$":"playpause","index$":35},"remaining":{"a":true,"h":"Remaining","n":"remaining","r":false,"t":"`$STRING`","key$":"remaining","index$":36},"replay":{"a":true,"h":"Replay","n":"replay","r":false,"t":"`$STRING`","key$":"replay","index$":37},"seekslider":{"a":true,"h":"Seekslider","n":"seekslider","r":false,"t":"`$STRING`","key$":"seekslider","index$":38},"selectembed":{"a":true,"h":"Selectembed","n":"selectembed","r":false,"t":"`$STRING`","key$":"selectembed","index$":39},"selectlink":{"a":true,"h":"Selectlink","n":"selectlink","r":false,"t":"`$STRING`","key$":"selectlink","index$":40},"share":{"a":true,"h":"Share","n":"share","r":false,"t":"`$STRING`","key$":"share","index$":41},"style":{"a":true,"h":"Style","n":"style","r":false,"t":"`$STRING`","key$":"style","index$":42},"subtitlescontrol":{"a":true,"h":"Subtitlescontrol","n":"subtitlescontrol","r":false,"t":"`$STRING`","key$":"subtitlescontrol","index$":43},"subtitleslanguage":{"a":true,"h":"Subtitleslanguage","n":"subtitleslanguage","r":false,"t":"`$STRING`","key$":"subtitleslanguage","index$":44},"subtitlesturnedoff":{"a":true,"h":"Subtitlesturnedoff","n":"subtitlesturnedoff","r":false,"t":"`$STRING`","key$":"subtitlesturnedoff","index$":45},"subtitlesturnedon":{"a":true,"h":"Subtitlesturnedon","n":"subtitlesturnedon","r":false,"t":"`$STRING`","key$":"subtitlesturnedon","index$":46},"threesixtydown":{"a":true,"h":"Threesixtydown","n":"threesixtydown","r":false,"t":"`$STRING`","key$":"threesixtydown","index$":47},"threesixtyicon":{"a":true,"h":"Threesixtyicon","n":"threesixtyicon","r":false,"t":"`$STRING`","key$":"threesixtyicon","index$":48},"threesixtyleft":{"a":true,"h":"Threesixtyleft","n":"threesixtyleft","r":false,"t":"`$STRING`","key$":"threesixtyleft","index$":49},"threesixtyright":{"a":true,"h":"Threesixtyright","n":"threesixtyright","r":false,"t":"`$STRING`","key$":"threesixtyright","index$":50},"threesixtyup":{"a":true,"h":"Threesixtyup","n":"threesixtyup","r":false,"t":"`$STRING`","key$":"threesixtyup","index$":51},"xshare":{"a":true,"h":"Xshare","n":"xshare","r":false,"t":"`$STRING`","key$":"xshare","index$":52}},"name":"video_localization","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /ac/ac-video/latest/json/localization/{locale}.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"en-US","k":"param","n":"locale","or":"locale","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/ac/ac-video/latest/json/localization/{locale}.json","q":{"exist":["locale"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"ac"},{"lit":"ac-video"},{"lit":"latest"},{"lit":"json"},{"lit":"localization"},{"lit":"{locale}.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"video_localization","name__orig":"video_localization","Name":"VideoLocalization","name_":"video_localization","name-":"video-localization","NAME":"VIDEO_LOCALIZATION","index$":6}, {"active":true,"entity":"video_localization","key$":"BasicVideoLocalizationFlow","kind":"basic","name":"BasicVideoLocalizationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"video_localization_ref01","srcdatavar":"video_localization_ref01_data","suffix":"_dt0"},"m":{"locale":"locale01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-video_localization_ref01"}}],"index$":0}]}, 'VideoLocalization', {"GET /ac/ac-video/latest/json/localization/{locale}.json":{"protocol":"http","parameters":[{"name":"locale","in":"path","required":true,"description":"Locale in `ll-CC` form, e.g. `en-US`, `fr-FR`.","schema":{"type":"string"},"example":"en-US","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let video_localization_ref01_data = Object.values(setup.data.existing.video_localization)[0] as any

    // LOAD
    const video_localization_ref01_ent = client.VideoLocalization()
    const video_localization_ref01_match_dt0: any = {}
    video_localization_ref01_match_dt0['locale'] = setup.idmap['locale'] ?? setup.idmap['locale01']
    const video_localization_ref01_data_dt0 = (await video_localization_ref01_ent.load(video_localization_ref01_match_dt0)).data()
    assert(null != video_localization_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/video_localization/VideoLocalizationTestData.json')

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
    ['video_localization01','video_localization02','video_localization03','locale01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APPLE_WEB_TEST_VIDEO_LOCALIZATION_ENTID': idmap,
    'APPLE_WEB_TEST_LIVE': 'FALSE',
    'APPLE_WEB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['APPLE_WEB_TEST_VIDEO_LOCALIZATION_ENTID']

  const live = 'TRUE' === env.APPLE_WEB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APPLE_WEB_TEST_VIDEO_LOCALIZATION_ENTID']
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
  
