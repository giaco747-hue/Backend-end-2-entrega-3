export const getEvents = async (req, res) => {
  try {
    // Retorna la lista vacía solicitada por los criterios de aceptación
    return res.status(200).json({
      status: "success",
      payload: []
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};