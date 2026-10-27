<?php
declare(strict_types=1);

// AppleWeb SDK utility: result_headers

class AppleWebResultHeaders
{
    public static function call(AppleWebContext $ctx): ?AppleWebResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
