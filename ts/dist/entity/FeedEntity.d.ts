import { AppleWebEntityBase } from '../AppleWebEntityBase';
import type { AppleWebSDK } from '../AppleWebSDK';
import type { Control } from '../types';
import type { Feed, FeedLoadMatch } from '../AppleWebTypes';
declare class FeedEntity extends AppleWebEntityBase<Feed> {
    constructor(client: AppleWebSDK, entopts: any);
    make(this: FeedEntity): FeedEntity;
    load(this: any, reqmatch?: FeedLoadMatch, ctrl?: Control): Promise<FeedEntity>;
}
export { FeedEntity };
