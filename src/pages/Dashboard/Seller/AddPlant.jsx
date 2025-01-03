import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { imageUpload } from "../../../api/utils";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import useAuth from "../../../hooks/useAuth";

const AddPlant = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadBtnText, setUploadBtnText] = useState({ name: "Upload image" });

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    };

    // Create plant data object
    const plantData = {
      name,
      category,
      description,
      price,
      quantity,
      image: imageUrl,
      seller,
    };
    console.table(plantData);

    //save plant in db
    try {
      //
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm
        handleSubmit={handleSubmit}
        uploadBtnText={uploadBtnText}
        setUploadBtnText={setUploadBtnText}
        loading={loading}
      />
    </div>
  );
};

export default AddPlant;
