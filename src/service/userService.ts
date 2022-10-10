import user, { User } from "../modules/user";

export class userService{
    public readAll(){
        return user;
    }

    public create(request: any){
        let newUser = request.body;

        user.push(new User(newUser.name, newUser.email, newUser.password));
    }

    public update(request: any){
        let updateUser = request.body;
        let index = user.findIndex((element: User) => element.getEmail() === updateUser.email);

        user[index] = new User(updateUser.name, updateUser.email, updateUser.password);
    }

    public delete(request: any){
        let deleteUser = request.body;

        const index = user.findIndex((element: User) => element.getEmail() === deleteUser.email);

        if (index > -1) {
            user.splice(index, 1);
        }
    }
}