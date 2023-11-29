const formElement = document.querySelector("form");
const input = formElement.firstElementChild.firstElementChild;
const warningElement = document.querySelector(".warning");
const bodyP = document.querySelector("body");

class Item{
    constructor(id, title){
        this.id = id;
        this.title = title;
    }
}


class List{
    constructor(){
        this.list = [];
        this.title = "";
        this.id = "";
        this.status = false;
        this.updatedItem = {};
        
        this.addLest = function(title, id){
            if (this.status == false) {
                if (input.value != "") {
                    let item = new Item(id, title);
                    this.list.push(item);
                    this.display()
                    input.value = "";
                    warningElement.classList.remove("active");
                }else{
                    warningElement.classList.add("active");
                };
            }else{
                this.updateItem(title)
            }
        };

        this.display = function(){
            let body = document.querySelector("table #t-body");
            body.innerHTML = "";
            this.list.forEach((item) =>{
                body.innerHTML+=`
                    <tr>
                        <td class="p-2">
                            ${item.title}
                        </td>
                        <td class="p-2 text-center">
                            <button class="px-4 btn btn-info btn-edit" data-target=${item.id}>
                                Edit
                            </button>
                        </td>
                        <td class="p-2 text-center">
                            <button class="btn-delete px-4 btn btn-danger" data-target=${item.id}>
                                Delete
                            </button>
                        </td>
                    </tr>
                `
            });
        };


        this.deleteItem = function(id){
            this.list = this.list.filter((item) => item.id != id);
            this.display();
        };

        this.editItem = function(id) {
            this.updatedItem = this.list.find((item) => item.id == id);
            this.status = true;
            input.value = this.updatedItem.title;
        };
        this.updateItem = function(changedTitle){
            this.list = this.list.map((item) =>{
                if (item.id == this.updatedItem.id) {
                    item.title = changedTitle;
                    return item;
                }else{
                    return item
                }
            });
            this.display()
            input.value ="";
            this.status = false;
            this.updateItem = {};
        };
    };
};

let list = new List();
list.display();

formElement.addEventListener("submit", (e) =>{
    e.preventDefault();
    let id = parseInt(Math.random() * 10000)
    list.addLest(input.value, id);
})

bodyP.addEventListener("click", (e) =>{
    let el = e.target;
    if (el.classList.contains("btn-delete")) {
        list.deleteItem(+el.dataset.target);
    };
    if (el.classList.contains("btn-edit")) {
        list.editItem(+el.dataset.target);
    };
});