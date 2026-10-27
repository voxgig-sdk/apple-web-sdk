import { AppleWebEntityBase } from '../AppleWebEntityBase';
import type { AppleWebSDK } from '../AppleWebSDK';
import type { Control } from '../types';
import type { ProductPrice, ProductPriceLoadMatch } from '../AppleWebTypes';
declare class ProductPriceEntity extends AppleWebEntityBase<ProductPrice> {
    constructor(client: AppleWebSDK, entopts: any);
    make(this: ProductPriceEntity): ProductPriceEntity;
    load(this: any, reqmatch?: ProductPriceLoadMatch, ctrl?: Control): Promise<ProductPriceEntity>;
}
export { ProductPriceEntity };
