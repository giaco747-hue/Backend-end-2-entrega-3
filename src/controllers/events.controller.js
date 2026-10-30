export const getEvents = async (req, res) => {
  try {
    return res.status(200).json({
      status: "success",
      payload: []
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};