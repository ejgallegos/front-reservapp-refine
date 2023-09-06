import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerBindings, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { DataProvider } from "@refinedev/strapi-v4";
import {
    AuthPage,
    ErrorComponent,
    notificationProvider,
    ThemedLayoutV2,
    ThemedTitleV2,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import * as Icons from "@ant-design/icons";

import { authProvider, axiosInstance } from "./authProvider";
import { Header } from "./components/header";
import { API_URL } from "./constants";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { ClienteList } from "./pages/clientes";
import { AlojamientoList } from "./pages/alojamientos";
import { ReservaList } from "./pages/reservas";
import { CalendarPage } from "./pages/calendario";

const {
    TeamOutlined,
    CalendarOutlined,
    AlertOutlined,
    HomeOutlined
} = Icons;

function App() {
    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <Refine
                        resources={[
                            {
                                name: "calendario",
                                list: "/calendario",
                                icon: <CalendarOutlined />,
                            },
                            {
                                name: "reservas",
                                list: "/reservas",
                                icon: <AlertOutlined />,
                            },
                            {
                                name: "alojamientos",
                                list: "/alojamientos",
                                icon: <HomeOutlined />,
                            },
                            {
                                name: "clientes",
                                list: "/clientes",
                                icon: <TeamOutlined />,
                            },
                        ]}
                        authProvider={authProvider}
                        dataProvider={DataProvider(
                            API_URL + `/api`,
                            axiosInstance,
                        )}
                        notificationProvider={notificationProvider}
                        routerProvider={routerBindings}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <ThemedLayoutV2
                                            Header={Header}
                                            Title={({ collapsed }: any) => (
                                                <ThemedTitleV2
                                                    collapsed={collapsed}
                                                    text="ReservApp"
                                                />
                                            )}
                                        >
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <NavigateToResource resource="calendario" />
                                    }
                                />
                                <Route path="/alojamientos">
                                    <Route index element={<AlojamientoList />} />
                                </Route>
                                <Route path="/clientes">
                                    <Route index element={<ClienteList />} />
                                </Route>
                                <Route path="/reservas">
                                    <Route index element={<ReservaList />} />
                                </Route>
                                <Route path="/calendario">
                                    <Route index element={<CalendarPage />} />
                                </Route>
                            </Route>
                            <Route
                                element={
                                    <Authenticated fallback={<Outlet />}>
                                        <NavigateToResource />
                                    </Authenticated>
                                }
                            >
                                <Route
                                    path="/login"
                                    element={
                                        <AuthPage
                                            type="login"
                                            title={
                                                <ThemedTitleV2
                                                    collapsed={false}
                                                    text="ReservApp"
                                                />
                                            }
                                            forgotPasswordLink={false}
                                            registerLink={false}
                                            formProps={{
                                                initialValues: {
                                                    email: "demo@refine.dev",
                                                    password: "demodemo",
                                                },
                                            }}
                                        />
                                    }
                                />
                            </Route>
                            <Route
                                element={
                                    <Authenticated>
                                        <ThemedLayoutV2
                                            Header={Header}
                                            Title={({ collapsed }: any) => (
                                                <ThemedTitleV2
                                                    collapsed={collapsed}
                                                    text="ReservApp"
                                                />
                                            )}
                                        >
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>

                        <RefineKbar />
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
