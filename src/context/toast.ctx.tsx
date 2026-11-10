import { createContext, useRef, type Context, type ReactNode,  } from "react";
import { Toast, type ToastMessage } from 'primereact/toast';



export function ToastProvider({children}: {children: ReactNode}) {
    const toast = useRef(null);
    const showToast = (message: ToastMessage | ToastMessage[]) => {
        const defaultMessage = {severity: 'success', summary: '', detail: '', life: 2000}

        // @ts-expect-error ddd
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        toast?.current?.show && toast.current.show({...defaultMessage,...message});
        
    };


  const res = {
    showToast
  }

  if(!ToastProvider['ToastCtx']) {
      // eslint-disable-next-line react-hooks/immutability
      ToastProvider['ToastCtx'] = createContext<IToastContext>(res);
  }

  const ToastCtx = ToastProvider['ToastCtx'];
  
        
  return (<ToastCtx value={res}><Toast ref={toast} />{children}</ToastCtx>)
}

export interface IToastContext {
  showToast: (message: ToastMessage | ToastMessage[])=>void;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ToastProvider {
  export const ToastCtx: Context<IToastContext> = ToastProvider['ToastCtx'];

}
