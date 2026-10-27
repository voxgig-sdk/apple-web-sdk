<?php
declare(strict_types=1);

// AppleWeb SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AppleWebMakeContext
{
    public static function call(array $ctxmap, ?AppleWebContext $basectx): AppleWebContext
    {
        return new AppleWebContext($ctxmap, $basectx);
    }
}
