import React, { useState } from "react";

export function Form() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    birthday: "",
    email: "",
    country: "",
    company: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log("Envío exitoso");
      } else {
        const response = await fetch("http://localhost:4000/api/save_request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        console.error("Envío fallido, enviando log a guardar:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nombre:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Apellido:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Fecha de Nacimiento:
          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          País:
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Compañía:
          <input type="text" name="company" value={formData.company} onChange={handleChange} />
        </label>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}
