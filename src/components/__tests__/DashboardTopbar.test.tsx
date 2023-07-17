import DashboardTopbar from "@/components/DashboardTopbar";
import ManagedUIProvider from "@/contexts/ManagedUiContext";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

describe("DashboardTopbar", () => {
  it("renders without crashing", () => {
    render(
      <ManagedUIProvider>
        <DashboardTopbar />
      </ManagedUIProvider>
    );
  });

  it('calls setIsModalOpen when the "+" button is clicked', () => {
    const setIsModalOpen = jest.fn();
    render(
      <ManagedUIProvider>
        <DashboardTopbar />
      </ManagedUIProvider>
    );
    fireEvent.click(screen.getByText("+"));
    expect(setIsModalOpen).toHaveBeenCalled();
  });
});
