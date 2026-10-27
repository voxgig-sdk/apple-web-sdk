import { AppleWebEntityBase } from '../AppleWebEntityBase';
import type { AppleWebSDK } from '../AppleWebSDK';
import type { Control } from '../types';
import type { Suggestion, SuggestionListMatch } from '../AppleWebTypes';
declare class SuggestionEntity extends AppleWebEntityBase<Suggestion> {
    constructor(client: AppleWebSDK, entopts: any);
    make(this: SuggestionEntity): SuggestionEntity;
    list(this: any, reqmatch?: SuggestionListMatch, ctrl?: Control): Promise<SuggestionEntity[]>;
}
export { SuggestionEntity };
