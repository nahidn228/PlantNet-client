import { Helmet } from "react-helmet-async";
import { imageUpload } from "../../../api/utils";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import useAuth from "../../../hooks/useAuth";

const AddPlant = () => {
  const { user } = useAuth();
  //handle form submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);

    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

      // seller info
      const seller = {
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
      }

      // Create plant data object
    const plantData = {
      name,
      category,
      description,
      price,
      quantity,
      image: imageUrl,
      seller,
    }
    console.table(plantData)
  };
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddPlant;
