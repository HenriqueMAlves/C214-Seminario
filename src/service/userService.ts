import user, { User } from "../modules/user";

type ResponseType = {
    error?: String,
    name?: String,
    email?: String,
    password?: String,
}

export class userService{
    public readAll(){
        return user;
    }

    public create(request: any): ResponseType{
        let newUser = request.body;
        let response;
        let index = user.findIndex((element: User) => element.getEmail() === newUser.email)
        
        if(index !== -1){
            response = {
                error: "Email de usuário já existe"
            };
        } else{
            user.push(new User(newUser.name, newUser.email, newUser.password));
            response = newUser;
        }

        return response;
    }

    public update(request: any): ResponseType{
        let updateUser = request.body;
        let response;
        let index = user.findIndex((element: User) => element.getEmail() === updateUser.email);

        if(index === -1){
            response = {
                error: "Usuário não encontrado"
            };
        } else{
            user[index] = new User(updateUser.name, updateUser.email, updateUser.password);
            response = updateUser;
        }

        return response;
    }

    public delete(request: any): ResponseType{
        let deleteUser = request.body;
        let response;
        
        const index = user.findIndex((element: User) => element.getEmail() === deleteUser.email);

        if(index === -1){
            response = {
                error: "Usuário não encontrado"
            };
        } else{
            response = {
                name: user[index].getName(),
                email: user[index].getEmail(),
                password: user[index].getPassword(),
            };
            user.splice(index, 1);
        }

        return response;
    }
}