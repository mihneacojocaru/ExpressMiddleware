import fs from 'fs';

export default class InsertsRepo {
    getInserts = () => {
        return new Promise( (resolve,reject) => {
            fs.readFile("./Data/data.json", "utf-8", (err, data)=> {
                if(err){
                    reject(err);
                } else{
                    const d = JSON.parse(data);
                    resolve(d);
                }
            })
        })
    }

    saveNewInsert = (data) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(
                "./Data/data.json",
                JSON.stringify(data, null, 2),
                err => {
                    if(err){
                        reject(err)
                    }else{
                        resolve('Succeded!');
                    }
                }
            );
        });
    }

    newIsertsList = async (obj) => {
        try {
            let items = await this.getInserts();

            let newInserts = { id: this.nextId(items), ...obj};

            items.push(newInserts);
            
            await this.saveNewInsert(items);
        } catch (error) {
            console.warn(error);
        }
    }

    nextId = (list) => {
        let idList = [];

        list.forEach( element => {
            idList.push(element.id);
        });

        return idList.pop() + 1;
    }

    deleteItem = async (id) =>{
        try {
            let items = await this.getInserts();
            items = items.filter( e => e.id != id);
            await this.saveNewInsert(items);
        } catch (error) {
            console.warn(error)
        }
    }
}