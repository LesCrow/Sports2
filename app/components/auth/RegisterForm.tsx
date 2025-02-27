import axios from "axios";
import { useForm } from "react-hook-form";

type TUserFormInput = {
  email: string;
  password: string;
};

export default function RegisterForm() {
  const { register, handleSubmit } = useForm<TUserFormInput>();

  const onSubmit = async (user: TUserFormInput) => {
    try {
      await axios.post("api/auth/register", {
        email: user.email,
        password: user.password,
      });
      alert("Utilisateur créé avec succés !");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'activité :", error);
      alert("Erreur lors de l'ajout de l'activité.");
    }
  };

  return (
    <div>
      <h1>RegisterForm</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email : </label>
        <input id="email" {...register("email")} />
        <label htmlFor="password">Password : </label>
        <input id="password" {...register("password")} />
        <button type="submit">S&apos;inscrire</button>
      </form>
    </div>
  );
}
