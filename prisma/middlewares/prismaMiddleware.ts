import { Prisma } from "@prisma/client";

export const calculateAverageSpeedMiddleware: Prisma.Middleware = async (
  params,
  next
) => {
  // Intercepter les actions create et update
  if (
    params.model === "Activity" &&
    (params.action === "create" || params.action === "update")
  ) {
    const data = params.args.data;

    if (data.distance && data.moving_time) {
      // Calculer la vitesse moyenne
      data.average_speed = data.moving_time / 60 / (data.distance / 1000);
    }
  }

  // Appeler le prochain middleware ou la requête
  return next(params);
};
