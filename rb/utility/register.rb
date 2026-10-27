# AppleWeb SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

AppleWebUtility.registrar = ->(u) {
  u.clean = AppleWebUtilities::Clean
  u.clean_add = AppleWebUtilities::CleanAdd
  u.clean_explain = AppleWebUtilities::CleanExplain
  u.done = AppleWebUtilities::Done
  u.make_error = AppleWebUtilities::MakeError
  u.feature_add = AppleWebUtilities::FeatureAdd
  u.feature_hook = AppleWebUtilities::FeatureHook
  u.feature_init = AppleWebUtilities::FeatureInit
  u.fetcher = AppleWebUtilities::Fetcher
  u.make_fetch_def = AppleWebUtilities::MakeFetchDef
  u.make_context = AppleWebUtilities::MakeContext
  u.make_options = AppleWebUtilities::MakeOptions
  u.make_request = AppleWebUtilities::MakeRequest
  u.make_response = AppleWebUtilities::MakeResponse
  u.make_result = AppleWebUtilities::MakeResult
  u.make_point = AppleWebUtilities::MakePoint
  u.make_spec = AppleWebUtilities::MakeSpec
  u.make_url = AppleWebUtilities::MakeUrl
  u.param = AppleWebUtilities::Param
  u.prepare_auth = AppleWebUtilities::PrepareAuth
  u.prepare_body = AppleWebUtilities::PrepareBody
  u.prepare_headers = AppleWebUtilities::PrepareHeaders
  u.prepare_method = AppleWebUtilities::PrepareMethod
  u.prepare_params = AppleWebUtilities::PrepareParams
  u.prepare_path = AppleWebUtilities::PreparePath
  u.prepare_query = AppleWebUtilities::PrepareQuery
  u.graphql_body = AppleWebUtilities::GraphqlBody
  u.graphql_errors = AppleWebUtilities::GraphqlErrors
  u.result_basic = AppleWebUtilities::ResultBasic
  u.result_body = AppleWebUtilities::ResultBody
  u.result_headers = AppleWebUtilities::ResultHeaders
  u.transform_request = AppleWebUtilities::TransformRequest
  u.transform_response = AppleWebUtilities::TransformResponse
}
