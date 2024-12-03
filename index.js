const items_list = document.getElementById('items_list');
const total_count = document.getElementById('total_count');
let count = 0;


const fetchItems = () => {
    
    axios.get('https://crudcrud.com/api/85c89c0d59224a37adf22a3bc9d40570/items')
        .then(response => {
            const items = response.data;
            
            count = items.length;
            total_count.textContent = `Total count: ${count}`;
            items.forEach(item => {
                displayItem(item);
            });
            
        })
        .catch(error => {
            console.log('Error fetching items:', error);
        });
    

};


const displayItem = (item) => {
    const li = document.createElement('li');
    const itemText = document.createElement('span');
    itemText.textContent = `${item.name} ${item.price} ${item.quantity}KG`;
    li.appendChild(itemText);

    const input_field = document.createElement('input');
    input_field.type = 'number';
    input_field.min = 1;
    input_field.max = item.quantity;
    input_field.id = 'input_field_value';
    input_field.name = 'input_field_';

    const buy_btn = document.createElement('button');
    buy_btn.textContent = 'Buy';

    const del_btn = document.createElement('button');
    del_btn.textContent = 'Del';

    li.append(input_field);
    li.append(buy_btn);
    li.append(del_btn);

    items_list.prepend(li);

   
    total_count.textContent = `Total count: ${count}`;

    
    buy_btn.addEventListener('click', () => {
        const inputValue = parseInt(input_field.value);
        if (inputValue > 0 && inputValue <= item.quantity) {
            item.quantity -= inputValue;
            itemText.textContent = `${item.name} ${item.price} ${item.quantity}KG`;

            if (item.quantity <= 0) {
                li.remove();
                count -= 1;
                total_count.textContent = `Total count: ${count}`;
                axios.delete(`https://crudcrud.com/api/85c89c0d59224a37adf22a3bc9d40570/items/${item._id}`)
                    .then(() => console.log('Item deleted'))
                    .catch(error => console.log('Error deleting item:', error));
            }
        }
    });

   
    del_btn.addEventListener('click', () => {
        li.remove();
        count -= 1;
        total_count.textContent = `Total count: ${count}`;
        axios.delete(`https://crudcrud.com/api/85c89c0d59224a37adf22a3bc9d40570/items/${item._id}`)
            .then(() => console.log('Item deleted'))
            .catch(error => console.log('Error deleting item:', error));
    });
};


const handleFormSubmit = (event) => {
    event.preventDefault();
    
    let name = event.target.name.value.trim();
    let price = 'RS:' + event.target.price.value.trim();
    let quantity = parseInt(event.target.quantity.value.trim());

    if (!name || !price || isNaN(quantity) || quantity <= 0) {
        alert('Please provide valid name, price, and quantity');
       
       
    }
    


    let items = {
        name,
        price,
        quantity
    };

    axios.post('https://crudcrud.com/api/85c89c0d59224a37adf22a3bc9d40570/items', items)
        .then((response) => {
            const newItem = response.data;
            displayItem(newItem); 
            count += 1;
            total_count.textContent = `Total count: ${count}`;
        })
        .catch((error) => {
            console.log('Error adding item:', error);
        });
};


window.onload = () => {
    
        fetchItems();
    
    
};

