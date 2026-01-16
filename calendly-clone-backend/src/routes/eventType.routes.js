import express from "express";
import {
  getEventTypes,
  createEventType
} from "../controllers/eventType.controller.js";

const router = express.Router();

router.get("/", getEventTypes);
router.post("/", createEventType);

export default router;
