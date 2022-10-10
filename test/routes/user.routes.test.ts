import request from "supertest";

import app from "../../src/app";
import user, { User } from "../../src/modules/user";

let userTest = {
  name: "user test",
  email: "test@email.com",
  password: "123456"
};

//Executa uma função antes que cada um dos testes neste arquivo seja executado
beforeEach(() => {
  user.push(new User(userTest.name, userTest.email, userTest.password));
});

//Executa uma função após cada um dos testes deste arquivo completar
afterEach(() => {
  while(user.length) {
    user.pop();
  } 
})

//Cria um bloco que agrupa vários testes relacionados (TEST SWITCH)
describe("User route (Happy Path)", () => {

  //Executa um teste
  test("read all users", async () => {
    const response = await request(app).get("/users/readAll");

    expect(response.body).toEqual([userTest]);
    expect(response.statusCode).toEqual(200);
  });

  test("add a new user", async () => {
    let newUser = {
      name: " new user test",
      email: "newuser@email.com",
      password: "999999"
    };

    const response = await request(app)
    .post("/users/create")
    .send(newUser);

    expect(response.body).toEqual(newUser);
    expect(response.statusCode).toEqual(201);
  });

  test("update an user", async () => {
    let updateUser = {
      name: " update user",
      email: userTest.email,
      password: "888888"
    };

    const response = await request(app)
    .put("/users/update")
    .send(updateUser);

    expect(response.body).toEqual(updateUser);
    expect(response.statusCode).toEqual(200);
  });

  test("delete an user", async () => {
    let deleteUser = {
      email: "test@email.com",
    };

    const response = await request(app)
    .delete("/users/delete")
    .send(deleteUser);

    expect(response.body).toEqual(userTest);
    expect(response.statusCode).toEqual(200);
  });
});

describe("User route (Unhappy Path)", () => {

  test("should not create a new user because the email field already exists", async () => {
    const response = await request(app)
    .post("/users/create")
    .send(userTest);

    let expectResponse = {
    error: "Email de usuário já existe"
    };

    expect(response.body).toEqual(expectResponse);
    expect(response.statusCode).toEqual(401);
  });

  test("should not update a user because the email field not exists", async () => {
    let updateUser = {
      name: " update user",
      email: "xxxxxxxxxxxxxxxxxx",
      password: "888888"
    };

    const response = await request(app)
    .put("/users/update")
    .send(updateUser);

    let expectResponse = {
      error: "Usuário não encontrado"
    };

    expect(response.body).toEqual(expectResponse );
    expect(response.statusCode).toEqual(400);
  });

  test("should not delete an user because the email field not exists", async () => {
    let deleteUser = {
      email: "xxxxxxxxxxxxxxxxxx",
    };

    let expectResponse = {
      error: "Usuário não encontrado"
    };

    const response = await request(app)
    .delete("/users/delete")
    .send(deleteUser);

    expect(response.body).toEqual(expectResponse);
    expect(response.statusCode).toEqual(400);
  });
});