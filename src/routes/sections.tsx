import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthLayout } from 'src/layouts/auth';
import { LyricLayout } from 'src/layouts/dashboard';

import Fallback from 'src/components/loading/fallback';

import { ROUTES } from './config';

// ----------------------------------------------------------------------
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

export const LyricHomePage = lazy(() => import('src/pages/lyric-home'));
export const LyricDetailPage = lazy(() => import('src/pages/lyric-detail'));

export const routesSection: RouteObject[] = [
  {
    element: (
      <LyricLayout>
        <Suspense fallback={<Fallback />}>
          <Outlet />
        </Suspense>
      </LyricLayout>
    ),
    children: [
      { index: true, element: <LyricHomePage /> },
      { path: ':slug', element: <LyricDetailPage /> },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <AuthLayout>
        <SignUpPage />
      </AuthLayout>
    ),
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
