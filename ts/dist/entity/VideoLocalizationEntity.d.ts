import { AppleWebEntityBase } from '../AppleWebEntityBase';
import type { AppleWebSDK } from '../AppleWebSDK';
import type { Control } from '../types';
import type { VideoLocalization, VideoLocalizationLoadMatch } from '../AppleWebTypes';
declare class VideoLocalizationEntity extends AppleWebEntityBase<VideoLocalization> {
    constructor(client: AppleWebSDK, entopts: any);
    make(this: VideoLocalizationEntity): VideoLocalizationEntity;
    load(this: any, reqmatch?: VideoLocalizationLoadMatch, ctrl?: Control): Promise<VideoLocalizationEntity>;
}
export { VideoLocalizationEntity };
