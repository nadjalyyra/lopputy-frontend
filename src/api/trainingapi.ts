export const fetchTrainings = () => {
  return fetch(import.meta.env.VITE_API_URL + "/trainings")
    .then(res => {
      if (!res.ok) throw new Error("Error fetching trainings");
      return res.json();
    });
};

export const saveTraining = (training: any) => {
  return fetch(import.meta.env.VITE_API_URL + "/trainings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(training)
  }).then(res => {
    if (!res.ok) throw new Error("Error adding training");
    return res.json();
  });
};