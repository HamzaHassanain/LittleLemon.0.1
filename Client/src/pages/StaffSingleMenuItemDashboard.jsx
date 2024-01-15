import React from "react";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import { useMenuItems } from "../context/MenuItemsContext";
import Input from "../components/Generics/Input";
import { useCategories } from "../context/CategoriesContext";
export default function StaffSingleMenuItemDashboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { menuItems, createMenuItem, updateMenuItem } = useMenuItems();
  const { categories } = useCategories();
  const [data, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [categoriesData, setCategoriesData] = React.useState([]);
  React.useEffect(
    (__) => {
      const item = menuItems.find((item) => item.id === parseInt(id));
      if (!item) setData({});
      else setData(item);

      const categoriesData = categories.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setCategoriesData(categoriesData);
    },
    [menuItems, categories, id]
  );
  async function handleFromSubmit(e) {
    e.preventDefault();
    const isValidId =
      id && menuItems.find((item) => item.id === parseInt(id))?.id
        ? true
        : false;
    try {
      data.category = data?.category?.id;
      if (isValidId) {
        await updateMenuItem(id, data);
      } else {
        const new_id = await createMenuItem(data);
        navigate("/staff/manager/menu-items/edit/" + new_id);
      }
      setErrors({});
    } catch (err) {
      setErrors({
        name: err?.response?.data?.name?.at(0),
        description: err?.response?.data?.description?.at(0),
        long_description: err?.response?.data?.long_description?.at(0),
        price: err?.response?.data?.price?.at(0),
        category: err?.response?.data?.category?.at(0),
        image_url: err?.response?.data?.image_url?.at(0),

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
        <div className="form-group">
          <label htmlFor="long_description">Long Description</label>
          <textarea
            name="long_description"
            id="long_description"
            placeholder="Long Description"
            defaultValue={data.long_description || ""}
            rows={10}
            onChange={(e) =>
              setData({ ...data, long_description: e.target.value })
            }
          ></textarea>
          <p className="error"> {errors?.long_description || ""} </p>
        </div>
        <br />
        <Input
          title={"Price"}
          type={"text"}
          name={"price"}
          error={errors?.price || ""}
          value={data.price || "0.00"}
          handleChange={(e) => setData({ ...data, price: e.target.value })}
        />
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <br />
          <Select
            options={categoriesData}
            value={
              categoriesData.find(
                (item) => item.value === data?.category?.id
              ) || {}
            }
            onChange={(e) => {
              const newCategory = categories.find(
                (cat) => cat?.id === Number(e.value)
              );
              setData({ ...data, category: newCategory });
            }}
          />
          <p className="error"> {errors?.category || ""} </p>
        </div>
        <br />
        <Input
          title={"Image URL"}
          type={"text"}
          name={"image_url"}
          value={data.image_url || ""}
          handleChange={(e) => setData({ ...data, image_url: e.target.value })}
        />

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
