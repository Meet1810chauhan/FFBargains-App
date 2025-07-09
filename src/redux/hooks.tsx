import { UseDispatch,useSelector ,TypedUseSelectorHook, useDispatch } from 'react-redux';

import { RootState,AppDispatch } from './store';

// Create custom hook je aapde game tyare aakhu na  lakhvu [ade atle te dispach and select mate custom hook banavya 

export const useAppDispatch = () => useDispatch<AppDispatch> ();

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector ;