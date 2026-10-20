export const getSessions = async (req, res) => {
  try {
    return res.status(200).json({
      status: "success",
      message: "Estructura inicial de sessions lista"
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};