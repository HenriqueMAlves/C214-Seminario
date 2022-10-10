import { Router, Request, Response, request } from "express";
import user from "../modules/user";
import { userService } from "../service/userService";

const router = Router();

router.get("/readAll", (req: Request, res: Response): void => {
  res.status(200).send(user);
});

router.post("/create", (req: Request, res: Response): void => {
  
  let service: userService = new userService;

  service.create(req);

  res.status(200).send(req.body);
});

router.put("/update", (req: Request, res: Response): void => {
  
  let service: userService = new userService;

  service.update(req);

  res.status(200).send(req.body);
});

router.delete("/delete", (req: Request, res: Response): void => {
  
  let service: userService = new userService;

  service.delete(req);

  res.status(200).send(req.body);
});

export { router };