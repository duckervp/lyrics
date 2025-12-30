import type { To, NavigateOptions } from 'react-router-dom';

import { useTransition } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'src/app/hooks';
import { changeValue } from 'src/app/api/search/searchSlice';

type SmoothNavigate = {
    (to: To, options?: NavigateOptions): void;
    (delta: number): void;
};

export function useSmoothNavigate(): SmoothNavigate {
    const navigate = useNavigate();
    const [, startTransition] = useTransition();

    const dispatch = useAppDispatch();

    return ((to: To | number, options?: NavigateOptions) => {
        dispatch(changeValue({ mode: 'song', 'value': '' }));
        startTransition(() => {
            if (typeof to === 'number') {
                navigate(to);
            } else {
                navigate(to, options);
            }
        });
    }) as SmoothNavigate;
}