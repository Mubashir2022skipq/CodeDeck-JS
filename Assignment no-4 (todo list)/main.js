let inputValue = document.getElementById('int_box');
let btnClick = document.getElementById('btn');
let addLst = document.getElementById('items_lst');


btnClick.addEventListener('click', function () {
   let newItemText = inputValue.value.trim();
    if ( newItemText == "") {
        alert("NO item is enter");
    }
    else {
       
        let items = addLst.querySelectorAll('ul span:first-child');
        let exists = false;
        items.forEach((item)=>{
            console.log(item)
            if(item.innerText.toLowerCase() ===   newItemText.toLowerCase())
            {
               exists = true;
               console.log(exists)
            }
        })

        if(exists)
        {
          alert('item already exist')
          return;
        }


        let ulCreate = document.createElement('ul');
        // create the warraper div for flex layout.
        let wrapperDiv = document.createElement('div');
        wrapperDiv.style.display = 'flex';
        wrapperDiv.style.justifyContent = 'space-between';
        wrapperDiv.style.alignItems = 'center';
        wrapperDiv.style.padding = '8px 12px';
        wrapperDiv.style.border = '1px solid #ccc';
        wrapperDiv.style.marginTop = '5px';
        //create the text element.

        let textSpan = document.createElement('span');
        textSpan.innerText = inputValue.value;

        //create the icon container.
        let iconSpan = document.createElement('span');
        iconSpan.innerHTML = ` 
            <svg id="delete_item"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
            <svg  id="edit_item"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
        `

        // ulCreate.innerHTML = `${inputValue.value} <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        // <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
        // `
        // addLst.appendChild(ulCreate);

        //Append text and icons to wrapper.
        wrapperDiv.appendChild(textSpan);
        wrapperDiv.appendChild(iconSpan);

        //append wrapper to ul
        ulCreate.appendChild(wrapperDiv);

        // Append ul to the main container
        addLst.appendChild(ulCreate);

        // clear the text input feild



         newItemText = " ";






       



        iconSpan.querySelector('#delete_item').addEventListener('click', function () {

            ulCreate.remove();
        })



        iconSpan.querySelector('#edit_item').addEventListener('click', function () {
            const currentText = textSpan.innerText; // Get current text of item
            const newText = prompt("Edit item:", currentText); // Show prompt with current text

            if (newText === null || newText.trim() === "") {
                //  If user cancels or enters blank, do nothing
                return;
            }

            //  Check if new text already exists in other items 
            let isDuplicateEdit = false;
            const allItems = addLst.querySelectorAll('ul span:first-child');
            allItems.forEach(item => {
                if (item !== textSpan && item.innerText.toLowerCase() === newText.trim().toLowerCase()) {
                    isDuplicateEdit = true;
                }
            });

            if (isDuplicateEdit) {
                alert("Edited item duplicates an existing item.");
            } else {
                textSpan.innerText = newText.trim(); //  Update the item text
            }
        });


    }

})


