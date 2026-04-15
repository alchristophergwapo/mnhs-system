import { createDynamicMiddleware } from "@reduxjs/toolkit";

const dynamicMiddlewareInstance = createDynamicMiddleware();

export const {middleware: dynamicMiddleware} = dynamicMiddlewareInstance;
