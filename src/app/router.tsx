import { createBrowserRouter, Link, redirect } from "react-router-dom";

import LoginPage from "../pages/login/LoginPage";
import { useAuthStore } from "../store/useAuthStore";

import { lazy } from "react";


const ProductsPage = lazy(()=>import("@/pages/products/ProductsPage"));


export const router = createBrowserRouter([
    {
        path: 'login',
        element: <LoginPage />
    }, {
        path: '*',
        element: <div>404 page <Link to={'/'}>go to Home</Link></div>
    }, {
        path: '/',
       
        loader: () => {
          /*   if(!useAuthStore.getState().user?.id) {
              return redirect("login");
            } */
        }, 
       
        element: <ProductsPage />,
        /* children:[
            {
                index: true,
                element: <Home />,
            },
            {
                path: "systree",
                element: <SystreePage />,
                loader: () => {
                  useModulesStore.getState().getModulesAsync();
                }
            },
            {
                path: "systree-query",
                element: <SystreeQueryPage />,
            },
            {
                path: "todo",
                element: <TodoPage />,
            },
            {
                path: "todo/task/:taskId",
                element: <TaskPage />,
            },
            {
                path: "todo/task_fc/:taskId",
                element: <TaskPageFormCustom />,
            },
            {
                path: "search",
                element: <SearchPage />,
            },
            {
                path: "tic-tac",
                element: <TicTacPage />,
                loader: () => import("../pages/TicTacPage/TicTacPage").then(m=>m.ticTacPageLoader()) //ticTacPageLoader
            },
            {
                path: "todo-redux",
                element: <Suspense fallback={<div className="absolute right-0 top-0 left-0 bottom-0 flex justify-content-center align-items-center"> <ProgressSpinner strokeWidth="4" /> </div>}>
                  <TodoReduxPage />
                </Suspense>,
            },
            {
                path: "todo-redux/task/:taskId",
                element: <TaskReduxForm />,
                action: taskReduxFormAction,
                loader: ({params})=>{
                  loadStore().then(async () => {
                    reduxStore.dispatch(getTaskAction(params.taskId || ''));
                  });
                }
            },
            {
                path: "todo-redux/todo-add",
                element: <TaskActionForm />,
                action: taskActionFormAction
            },
            {
                path: "excel",
                element: <ExcelPage />,
            },
            {
                path: "mxgraph",
                element: <MXGraphPage />,
            },
            
            
            
        ] */
    }
            
      /* {
        index: true,
        loader: () => redirect("/users"),
      },
      {
        path: "users",
        element: <UsersList />,
        loader: () => {
          loadStore().then(async () => {
            store.dispatch(usersApi.util.prefetch("getUsers", undefined, {}));
          });
          return null;
        },
      },
      {
        path: "users/:id",
        element: <UserInfo />,
        loader: ({ params }) => {
          loadStore().then(() => {
            store.dispatch(
              usersApi.util.prefetch("getUser", params.id ?? "", {})
            );
          });
          return null;
        },
      },
      {
        path: "counters",
        element: <Counters />,
      }, */
   
]);