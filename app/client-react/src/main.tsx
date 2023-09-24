import { createRoot } from 'react-dom/client';
import App from './page/@/App';
import QueryClientProvider from '@/library/react-query/QueryClientProvider';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Backoffice from './page/@backoffice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/backoffice",
    element: <Backoffice />
  }
]);

const selected = document.getElementById('root');
if (selected) {
  const root = createRoot(selected);
  root.render(
    // @ts-expect-error 여기 왜 에러나지?
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}
