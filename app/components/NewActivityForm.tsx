import { Controller, useForm } from "react-hook-form";
import { formatHMStoSeconds } from "../utils/timeUtils";
import { Activity, SportType, Type } from "@prisma/client";
import TimeInput from "./TimeInput";
import { useState } from "react";
import { getMessageBasedOnTime } from "../utils/stringUtils";

type ActivityFormInputs = Omit<Activity, "moving_time"> & {
  moving_time: string;
};

export default function NewActivityForm() {
  const { register, handleSubmit, reset, control } =
    useForm<ActivityFormInputs>();

  const [selectedSport, setSelectedSport] = useState("");
  const [selectedType, setselectedType] = useState("");

  const sportTypes = SportType;
  const types = Type;
  const sportsWithDistance = ["CYCLING", "ROLLER", "RUNNING", "SWIMMING"];

  const onSubmit = async (data: ActivityFormInputs) => {
    if (data.name === "") {
      data.name = getMessageBasedOnTime() + " " + data.sport_type.toLowerCase();
    }
    const payload = {
      ...data,

      distance: data.distance ? data.distance * 1000 : 0, // Convertir en mètres
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
    <div className="border-4 border-red-400">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nom de l&apos;activité</label>
        <input id="name" {...register("name")} />

        <label htmlFor="sport_type">Type de sport</label>
        <select
          id="sport_type"
          {...register("sport_type", { required: true })}
          value={selectedSport} // Lier l'état de sport sélectionné avec la valeur du select
          onChange={(e) => setSelectedSport(e.target.value)}
        >
          <option value="" disabled>
            Choisir un sport
          </option>
          {/* Option par défaut */}
          {Object.entries(sportTypes).map(([key, value]) => {
            return (
              <option key={key} value={key}>
                {value.toLowerCase()}
              </option>
            );
          })}
        </select>
        <label htmlFor="type">Type</label>
        <select
          id="type"
          {...register("type", { required: true })}
          value={selectedType} // Lier l'état de sport sélectionné avec la valeur du select
          onChange={(e) => setselectedType(e.target.value)}
        >
          <option value="" disabled>
            Choisis un type
          </option>
          {Object.entries(types).map(([key, value]) => {
            return (
              <option key={key} value={key}>
                {value.toLowerCase()}
              </option>
            );
          })}
        </select>

        {sportsWithDistance.includes(selectedSport) && (
          <div>
            <label htmlFor="distance">Distance (en km)</label>
            <input
              id="distance"
              type="number"
              step={0.1}
              {...register("distance", {
                required: false,
                valueAsNumber: true,
              })}
            />
          </div>
        )}

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
