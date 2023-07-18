import { createContext, useContext, useState, type ReactNode } from "react";

type ManagedUIContextType = {
  modals: { [id: string]: boolean };
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
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
  const [modals, setModals] = useState({});

  const openModal = (id: string) => setModals({ ...modals, [id]: true });
  const closeModal = (id: string) => setModals({ ...modals, [id]: false });

  const value = { modals, openModal, closeModal };

  return (
    <ManagedUIContextProvider value={value}>
      {children}
    </ManagedUIContextProvider>
  );
}

export default ManagedUIProvider;
