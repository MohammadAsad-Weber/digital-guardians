import { Password } from "@/models/index.js";
import type { RequestHandler } from "express";
import { createResponse } from "@/utilities/index.js";
import type { IdParams } from "@/validators/params/index.js";

// Delete Password handler – removes a specific password record belonging to the authenticated user
const deletePassword: RequestHandler<IdParams> = async (req, res, next) => {
  try {
    // Verify the password record exists and is owned by the authenticated user
    const password = await Password.findById({
      _id: req.params.id,
      userRef: req.user.id,
    });
    // Return a 404 response if the record does not exist or is unauthorized
    if (!password) {
      createResponse(res).send({
        status: "Not Found",
        status_code: 404,
        message: "No record found with the provided Object ID",
      });
      return;
    }
    // Proceed to delete the verified password record
    await Password.findByIdAndDelete(req.params.id);

    // Respond with a success message after deletion
    createResponse(res).send({
      status: "OK",
      status_code: 200,
      message: "Password record has been deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default deletePassword;
