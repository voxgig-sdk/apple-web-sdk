import { AppleWebEntityBase } from '../AppleWebEntityBase';
import type { AppleWebSDK } from '../AppleWebSDK';
import type { Control } from '../types';
import type { Flyout, FlyoutListMatch } from '../AppleWebTypes';
declare class FlyoutEntity extends AppleWebEntityBase<Flyout> {
    constructor(client: AppleWebSDK, entopts: any);
    make(this: FlyoutEntity): FlyoutEntity;
    list(this: any, reqmatch?: FlyoutListMatch, ctrl?: Control): Promise<FlyoutEntity[]>;
}
export { FlyoutEntity };
