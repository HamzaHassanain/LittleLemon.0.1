import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/Generics/Input";
import { useCategories } from "../context/CategoriesContext";
export default function StaffSingleMenuItemDashboard() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { categories, updateCategory, createCategory } = useCategories();
  const [data, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  React.useEffect(
    (__) => {
      const item = categories.find((item) => item.id === parseInt(id));
      if (!item) setData({});
      else setData(item);
    },
    [categories, id]
  );
  async function handleFromSubmit(e) {
    e.preventDefault();
    const isValidId =
      id && categories.find((item) => item.id === parseInt(id))?.id
        ? true
        : false;
    try {
      if (isValidId) {
        await updateCategory(id, data);
      } else {
        const new_id = await createCategory(data);
        navigate("/staff/manager/categories/edit/" + new_id);
      }
      setErrors({});
    } catch (err) {
      setErrors({
        name: err?.response?.data?.name?.at(0),
        description: err?.response?.data?.description?.at(0),

        non_field_errors: err?.response?.non_field_errors,
        unknown_error: err?.message,
      });
    }
  }
  return (
    <div className="UpdateFrom">
      <form onSubmit={handleFromSubmit}>
        <p className="error container"> {errors.unknown_error} </p>
        <div className="error container">
          {errors.non_field_errors?.map((err) => (
            <p key={err}>{err}</p>
          ))}{" "}
        </div>
        <Input
          title={"Name"}
          type={"text"}
          name={"name"}
          error={errors?.name || ""}
          value={data.name || ""}
          handleChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <Input
          title={"Description"}
          type={"text"}
          name={"description"}
          error={errors?.description || ""}
          value={data.description || ""}
          handleChange={(e) =>
            setData({ ...data, description: e.target.value })
          }
        />

        <br />

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
