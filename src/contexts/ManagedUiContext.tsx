import { createContext, useContext, useState, type ReactNode } from "react";

type ManagedUIContextType = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
};

function createCtx<ContextType extends object | null>() {
  const ctx = createContext<ContextType | undefined>(undefined);

  function useCtx() {
    const context = useContext(ctx);
    if (context === undefined)
      throw new Error("useCtx must be inside a Provider with a value");

    return context;
  }

  return [useCtx, ctx.Provider] as const;
}

export const [useManagedUIContext, ManagedUIContextProvider] =
  createCtx<ManagedUIContextType>();

function ManagedUIProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const value = { isModalOpen, setIsModalOpen };

  return (
    <ManagedUIContextProvider value={value}>
      {children}
    </ManagedUIContextProvider>
  );
}

export default ManagedUIProvider;
