import fs from 'fs';

export default class ProductsRepo {
    getProducts = () => {
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

    saveNewProducts = (data) => {
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

    newProductsList = async (obj) => {
        try {
            let items = await this.getProducts();

            let newInserts = { id: this.nextId(items), ...obj};

            items.push(newInserts);
            
            await this.saveNewProducts(items);
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
            let items = await this.getProducts();
            items = items.filter( e => e.id != id);
            await this.saveNewProducts(items);
        } catch (error) {
            console.warn(error)
        }
    }

    updateProduct = async (obj) => {
        
        try {
            let items = await this.getProducts();
            for(let i=0; i<items.length; i++){
                if(items[i].id == obj.id){
                    items[i].title = obj.title;
                    items[i].price = obj.price;
                    items[i].description = obj.description;
                    items[i].photo = obj.photo;
                }
            }
            await this.saveNewProducts(items);
        } catch (error) {
            console.warn(error);
        }
    }

    verifyItem = async (id) => {
        let items = await this.getProducts();
        let boolean = false;
        items.forEach( e => {
            if(e.id == id){
                boolean = true;
            }    
        });
        return boolean;
    }
}