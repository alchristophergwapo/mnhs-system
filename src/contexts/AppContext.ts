import { createContext } from "react";

/**
 * The type of our AppContext value
 */
export type AppContextType = Record<string, unknown>;

/**
 * The AppContext object
 */
const AppContext = createContext<AppContextType>({});

export default AppContext;