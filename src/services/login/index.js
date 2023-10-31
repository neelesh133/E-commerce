export const login = async (formData) => {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
