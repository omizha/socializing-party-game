import { createRoot } from 'react-dom/client';
import App from './page/@/App';
import QueryClientProvider from '@/library/react-query/QueryClientProvider';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
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
