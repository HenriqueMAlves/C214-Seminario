import { Router, Request, Response, request } from "express";
import { userService } from "../service/userService";

const router = Router();
const service: userService = new userService;

router.get("/readAll", (req: Request, res: Response): void => {
  let response = service.readAll();

  res.status(200).send(response);
});

router.post("/create", (req: Request, res: Response): void => {
  let response = service.create(req);

  if(response.error !== undefined){
    res.status(401).send(response); //Unauthorized
  } else {
    res.status(201).send(response); //Created
  }
  
});

router.put("/update", (req: Request, res: Response): void => {
  let response = service.update(req);

  if(response.error !== undefined){
    res.status(400).send(response); //Bad request
  } else {
    res.status(200).send(response); //Ok
  }
});

router.delete("/delete", (req: Request, res: Response): void => {
  let response = service.delete(req);

  if(response.error !== undefined){
    res.status(400).send(response); //Bad request
  } else {
    res.status(200).send(response); //Ok
  }
});

export { router };