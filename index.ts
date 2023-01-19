let insertContactName = document.querySelector(
  ".insertContactName"
) as HTMLInputElement;
let insertContactNumber = document.querySelector(
  ".insertContactNumber"
) as HTMLInputElement;
let form = document.querySelector("form") as HTMLFormElement;
let contactName = document.querySelector("h3") as HTMLHeadingElement;
let contactNumber = document.querySelector("p") as HTMLParagraphElement;
let contactList = document.querySelector(".contact-list") as HTMLDivElement;
let btnList = document.querySelector(".btn-list") as HTMLButtonElement;
let alreadyExist = document.querySelector(
  ".already-exist"
) as HTMLParagraphElement;
let removeContacts =
  document.querySelectorAll<HTMLDivElement>(".remove-contact");


interface Contact {
  id: number;
  contactNamee: string;
  contactNumberr: string;
}

const checkContactInfo = (): Contact[] => {
  let info = localStorage.getItem("contactInfo");
  if (info === null) {
    return [];
  }
  return JSON.parse(info);
};

let contactArr: Contact[] = checkContactInfo();

let checkContactInformation = ():void => {
  let displayContact= document.querySelector('.display-contact') as HTMLParagraphElement;

  console.log(contactArr)
  if(contactArr.length == 0){
    displayContact.style.display='block';
    console.log('if')
  }else{
    displayContact.style.display='none';
    console.log('else')
  }}
    
  checkContactInformation()


let setContactToLocalStorage = ():void => {
  localStorage.setItem("contactInfo", JSON.stringify(contactArr));

  checkContactInformation()

  
};
// localStorage.clear()






let checkValue = ():void => {
  if (
    insertContactName?.value.trim() == "" ||
    insertContactNumber?.value == null
  )
    return;

    let id:number;
    if(contactArr.length<=0){
       id=1
    }
    else{
      id=contactArr[contactArr.length-1].id + 1
    }
  const newContact: Contact = {
    id: id,
    contactNamee: insertContactName.value,
    contactNumberr: insertContactNumber.value,
  };
  contactArr.push(newContact);
  // console.log(contactArr)

  setContactToLocalStorage();
  
  addNewContact(newContact);

};



let addNewContact = (contact: Contact):void => {
  let content:string=''

  content += `
  
        <div class="contact-content">
        <div class="contact-info">
            <h3>${contact.contactNamee}</h3>
            <p>${contact.contactNumberr}</p>
        </div>
        <div class="icons">
            <i  data-id=${contact.id} class="fa-solid fa-trash  remove-contact"></i>
           <a href="tel:${contact.contactNumberr}"> <i class="fa-solid fa-phone  call-icon"></i></a>
        </div>
    </div>
    

        `;
  contactList.innerHTML += content;
  
  

  let removeContacts =
    document.querySelectorAll<HTMLButtonElement>(".remove-contact");


  removeContacts.forEach((removeButton) => {
    removeButton.addEventListener("click", () => {
        // console.log(contactArr)
      contactArr.map((contactItem,index) => {
        let stringContactId:(string|undefined)=removeButton?.dataset.id
        if(stringContactId!==undefined){
         let contactIdNumber:number =parseInt(stringContactId);
        if (contactItem.id == contactIdNumber) {
          contactArr.splice(index, 1);
          let contactInfo= removeButton.closest('.contact-content') as HTMLDivElement;
          if(contactInfo!==null){
          contactInfo.style.display="none";}
          console.log("remove");


        }
      }}
      );
      // console.log(contactArr)

      checkContactInformation()

      setContactToLocalStorage();



    });


  });


};

contactArr.forEach(addNewContact);


form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkValue()
  insertContactName.value = "";
  insertContactNumber.value = "";
});

// localStorage.clear();
