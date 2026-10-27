import { AppleWebEntityBase } from '../AppleWebEntityBase';
import type { AppleWebSDK } from '../AppleWebSDK';
import type { Control } from '../types';
import type { Articlecategory, ArticlecategoryListMatch } from '../AppleWebTypes';
declare class ArticlecategoryEntity extends AppleWebEntityBase<Articlecategory> {
    constructor(client: AppleWebSDK, entopts: any);
    make(this: ArticlecategoryEntity): ArticlecategoryEntity;
    list(this: any, reqmatch?: ArticlecategoryListMatch, ctrl?: Control): Promise<ArticlecategoryEntity[]>;
}
export { ArticlecategoryEntity };
