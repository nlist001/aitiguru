import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import '@/scss/index.scss';
import { PrimeReactProvider } from 'primereact/api';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ToastProvider } from '@/context/toast.ctx.tsx';

createRoot(document.getElementById('root')!).render(
    
  <StrictMode>
  <Suspense fallback={<div className="absolute right-0 top-0 left-0 bottom-0 flex justify-content-center align-items-center"> <ProgressSpinner strokeWidth="8" /> </div>}>
    <ToastProvider>
      <PrimeReactProvider >
        <RouterProvider router={router} />
      </PrimeReactProvider>
    </ToastProvider>
  </Suspense>
</StrictMode>


 
)