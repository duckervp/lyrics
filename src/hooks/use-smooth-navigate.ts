import type { To, NavigateOptions } from 'react-router-dom';

import { useTransition } from 'react';
import { useNavigate } from 'react-router-dom';

type SmoothNavigate = {
    (to: To, options?: NavigateOptions): void;
    (delta: number): void;
};

export function useSmoothNavigate(): SmoothNavigate {
    const navigate = useNavigate();
    const [, startTransition] = useTransition();

    return ((to: To | number, options?: NavigateOptions) => {
        startTransition(() => {
            if (typeof to === 'number') {
                navigate(to);
            } else {
                navigate(to, options);
            }
        });
    }) as SmoothNavigate;
}