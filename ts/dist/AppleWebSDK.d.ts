import { ArticlecategoryEntity } from './entity/ArticlecategoryEntity';
import { FeedEntity } from './entity/FeedEntity';
import { FlyoutEntity } from './entity/FlyoutEntity';
import { GeoswitcherEntity } from './entity/GeoswitcherEntity';
import { ProductPriceEntity } from './entity/ProductPriceEntity';
import { SuggestionEntity } from './entity/SuggestionEntity';
import { VideoLocalizationEntity } from './entity/VideoLocalizationEntity';
export type * from './AppleWebTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { AppleWebEntityBase } from './AppleWebEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class AppleWebSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Articlecategory(entopts?: Record<string, any>): ArticlecategoryEntity;
    Feed(entopts?: Record<string, any>): FeedEntity;
    Flyout(entopts?: Record<string, any>): FlyoutEntity;
    Geoswitcher(entopts?: Record<string, any>): GeoswitcherEntity;
    ProductPrice(entopts?: Record<string, any>): ProductPriceEntity;
    Suggestion(entopts?: Record<string, any>): SuggestionEntity;
    VideoLocalization(entopts?: Record<string, any>): VideoLocalizationEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): AppleWebSDK;
    tester(testopts?: any, sdkopts?: any): AppleWebSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof AppleWebSDK;
export { stdutil, config, BaseFeature, AppleWebEntityBase, AppleWebSDK, SDK, };
export type { DirectResult };
