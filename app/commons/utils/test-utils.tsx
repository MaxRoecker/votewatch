import type { FC, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';

export type WrapperOptions<T extends object = object> = {
  router?: { route: string; path: string };
  context?: T;
};

export type WrapperProps = { children: ReactNode };

export function getWrapper(options?: WrapperOptions): FC<WrapperProps> {
  const context = options?.context ?? { locale: 'en-US' };
  const { route = '/', path = '/' } = options?.router ?? {};
  // eslint-disable-next-line react/prop-types
  return function Providers({ children }): ReactNode {
    return (
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={route} element={<Outlet context={context} />}>
            <Route index element={children} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };
}

function customRender(...args: Parameters<typeof render>) {
  const [ui, options] = args;
  const wrapper = options?.wrapper ?? getWrapper();
  return render(ui, { wrapper, ...options });
}

// eslint-disable-next-line import/export
export * from '@testing-library/react';

export { default as userEvent } from '@testing-library/user-event';

// override render export
// eslint-disable-next-line import/export
export { customRender as render };
