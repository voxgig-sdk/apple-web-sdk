<?php
declare(strict_types=1);

// AppleWeb SDK base feature

class AppleWebBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(AppleWebContext $ctx, array $options): void {}
    public function PostConstruct(AppleWebContext $ctx): void {}
    public function PostConstructEntity(AppleWebContext $ctx): void {}
    public function SetData(AppleWebContext $ctx): void {}
    public function GetData(AppleWebContext $ctx): void {}
    public function GetMatch(AppleWebContext $ctx): void {}
    public function SetMatch(AppleWebContext $ctx): void {}
    public function PrePoint(AppleWebContext $ctx): void {}
    public function PreSpec(AppleWebContext $ctx): void {}
    public function PreRequest(AppleWebContext $ctx): void {}
    public function PreResponse(AppleWebContext $ctx): void {}
    public function PreResult(AppleWebContext $ctx): void {}
    public function PreDone(AppleWebContext $ctx): void {}
    public function PreUnexpected(AppleWebContext $ctx): void {}
}
