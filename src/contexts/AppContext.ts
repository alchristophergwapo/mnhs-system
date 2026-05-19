import { UserType } from "@types";
import { Session } from "next-auth";
import { createContext } from "react";

/**
 * The type of our AppContext value
 */
export type AppContextType = {
  user?: Partial<UserType>;
  session?: Session;
};

/**
 * The AppContext object
 */
const AppContext = createContext<AppContextType>({});

export default AppContext;
