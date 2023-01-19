"use strict";
let insertContactName = document.querySelector(".insertContactName");
let insertContactNumber = document.querySelector(".insertContactNumber");
let form = document.querySelector("form");
let contactName = document.querySelector("h3");
let contactNumber = document.querySelector("p");
let contactList = document.querySelector(".contact-list");
let btnList = document.querySelector(".btn-list");
let alreadyExist = document.querySelector(".already-exist");
let removeContacts = document.querySelectorAll(".remove-contact");
let displayContact = document.querySelector('.display-contact');
const checkContactInfo = () => {
    let info = localStorage.getItem("contactInfo");
    if (info === null) {
        return [];
    }
    return JSON.parse(info);
};
let contactArr = checkContactInfo();
let setContactToLocalStorage = () => {
    localStorage.setItem("contactInfo", JSON.stringify(contactArr));
};
let checkContactInformation = () => {
    if (contactArr.length <= 0) {
        displayContact.innerHTML = 'No contact information available';
    }
    else {
        displayContact.style.display = 'none';
    }
};
checkContactInformation();
let checkValue = () => {
    if ((insertContactName === null || insertContactName === void 0 ? void 0 : insertContactName.value.trim()) == "" ||
        (insertContactNumber === null || insertContactNumber === void 0 ? void 0 : insertContactNumber.value) == null)
        return;
    const newContact = {
        id: contactArr.length,
        contactNamee: insertContactName.value,
        contactNumberr: insertContactNumber.value,
    };
    contactArr.push(newContact);
    setContactToLocalStorage();
    addNewContact(newContact);
    // return newContact.id
};
let addNewContact = (contact) => {
    let content = '';
    content += `
        <div class="contact-content">
        <div class="contact-info">
            <h3>${contact.contactNamee}</h3>
            <p>${contact.contactNumberr}</p>
        </div>
        <div class="remove-contact">
            <i class="fa-solid fa-trash"></i>
        </div>
    </div>

        `;
    contactList.innerHTML += content;
    let removeContacts = document.querySelectorAll(".remove-contact");
    removeContacts.forEach((r) => {
        r.addEventListener("click", () => {
            console.log(contactArr);
            console.log(contact.id);
            contactArr.map((i, index) => {
                if (i.id == contact.id) {
                    // let index = contactArr.indexOf(contact);
                    contactArr.splice(index, 1);
                    console.log("remove");
                }
            });
            setContactToLocalStorage();
        });
    });
};
contactArr.forEach(addNewContact);
form.addEventListener("submit", (e) => {
    // e.preventDefault();
    checkValue();
    insertContactName.value = "";
    insertContactNumber.value = "";
});
// localStorage.clear();
