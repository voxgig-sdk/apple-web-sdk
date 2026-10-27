import { AppleWebEntityBase } from '../AppleWebEntityBase';
import type { AppleWebSDK } from '../AppleWebSDK';
import type { Control } from '../types';
import type { Geoswitcher, GeoswitcherListMatch } from '../AppleWebTypes';
declare class GeoswitcherEntity extends AppleWebEntityBase<Geoswitcher> {
    constructor(client: AppleWebSDK, entopts: any);
    make(this: GeoswitcherEntity): GeoswitcherEntity;
    list(this: any, reqmatch?: GeoswitcherListMatch, ctrl?: Control): Promise<GeoswitcherEntity[]>;
}
export { GeoswitcherEntity };
