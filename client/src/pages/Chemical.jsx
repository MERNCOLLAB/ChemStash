import { useState } from "react";
import Button from "../components/Button";
import { Input } from "../components/Input";

function Chemical() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setFormData({
      ...formData,
      [id]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/chemical/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        return;
      }
      setFormData({});
      alert("Chemical successfully created");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  console.log(loading);
  console.log(error);

  return (
    <div className="p-3 max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
        />
        <Input
          id="casNumber"
          type="number"
          placeholder="CAS Number"
          onChange={handleChange}
        />
        <Input
          id="molecularFormula"
          type="text"
          placeholder="Molecular Formula"
          onChange={handleChange}
        />
        <Input
          id="purity"
          type="text"
          placeholder="Purity"
          onChange={handleChange}
        />
        <Input
          id="location"
          type="text"
          placeholder="Location"
          onChange={handleChange}
        />
        <Input
          id="supplier"
          type="text"
          placeholder="Supplier"
          onChange={handleChange}
        />
        <div className="flex justify-between">
          <span></span>
          <Button>Add Chemical</Button>
        </div>
      </form>
    </div>
  );
}

export default Chemical;
