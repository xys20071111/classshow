import { Reducers as UserInfoReducers} from './UserInfoStore/UserInfoReducers'
import { Reducers as HomeReducers } from './Home/Reducers';
import { Reducers as ClassSpaceHomeReducers } from "./ClassSpaceHome/Reducers"
import { Reducers as ArtsHomeReducers } from './ArtsShow/Reducers';

const Reducers = {
    // ...UserInfoReducers,
    ...HomeReducers,
    ...ClassSpaceHomeReducers,
    ...ArtsHomeReducers,
}
export {Reducers};
