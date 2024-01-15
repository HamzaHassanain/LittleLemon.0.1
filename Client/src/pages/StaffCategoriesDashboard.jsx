import React from "react";
import PageHeader from "../components/Staff/PageHeader";
import CategoriesList from "../components/StaffCategoriesDashboard/CategoriesList";
export default function StaffCategoriesDashboard() {
  return (
    <div className="StaffCategoriesDashboard">
      <PageHeader title="Categories" />
      <CategoriesList />
    </div>
  );
}
