import React from "react";
import StaffProtectedRoute from "../router/StaffProtectedRoute";
import PropperComponent from "../components/Staff/PropperComponent";
export default function Staff() {
  return (
    <StaffProtectedRoute>
      <PropperComponent />
    </StaffProtectedRoute>
  );
}
