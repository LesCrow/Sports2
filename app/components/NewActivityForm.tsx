import { Controller, useForm } from "react-hook-form";
import { formatHMStoSeconds } from "../utils/timeUtils";
import { Activity, SportType, Type } from "@prisma/client";
import TimeInput from "./TimeInput";

type ActivityFormInputs = Omit<Activity, "moving_time"> & {
  moving_time: string;
};

export default function NewActivityForm() {
  const { register, handleSubmit, reset, control } =
    useForm<ActivityFormInputs>();
  const sportTypes = SportType;
  const type = Type;

  // Texte préformatté en fonction de l'heure
  const getMessageBasedOnTime = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Morning";
    }
    if (currentHour >= 12 && currentHour < 18) {
      return "Afternoon";
    }
    if (currentHour >= 18 && currentHour < 22) {
      return "Evening";
    }
    return "Night";
  };

  const onSubmit = async (data: ActivityFormInputs) => {
    if (data.name === "") {
      data.name = getMessageBasedOnTime() + " " + data.sport_type.toLowerCase();
    }
    const payload = {
      ...data,

      distance: data.distance * 1000, // Convertir en mètres
      moving_time: formatHMStoSeconds(data.moving_time), // Convertir en secondes
    };

    try {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erreur : ${errorData.error}`);
      } else {
        alert("Activité ajoutée avec succès !");
        reset(); // Réinitialiser le formulaire
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'activité :", error);
      alert("Erreur lors de l'ajout de l'activité.");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nom de l&apos;activité</label>
        <input id="name" {...register("name")} />

        <label htmlFor="sport_type">Type de sport</label>
        <select id="sport_type" {...register("sport_type", { required: true })}>
          {Object.entries(sportTypes).map(([key, value]) => {
            return (
              <option key={key} value={key}>
                {value.toLowerCase()}
              </option>
            );
          })}
        </select>
        <label htmlFor="type">Type</label>
        <select id="type" {...register("type", { required: true })}>
          {Object.entries(type).map(([key, value]) => {
            return (
              <option key={key} value={key}>
                {value.toLowerCase()}
              </option>
            );
          })}
        </select>

        <label htmlFor="distance">Distance (en km)</label>
        <input
          id="distance"
          type="number"
          step={0.1}
          {...register("distance", { required: true, valueAsNumber: true })}
        />

        {/* Utilisation de Controller pour le champ moving_time */}
        <Controller
          name="moving_time"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TimeInput value={field.value} onChange={field.onChange} />
          )}
          rules={{
            required: "Le temps est requis",
            validate: (value) =>
              /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(value) ||
              "Le format doit être hh:mm:ss",
          }}
        />

        <button type="submit">Ajouter l&apos;activité</button>
      </form>
    </div>
  );
}
