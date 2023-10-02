let forms=document.getElementById("forms");
let items=document.getElementById("list");
forms.addEventListener("submit",onsignup);
document.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/396d9c42af7a4463abde369f1acb4623/appointment").then((res)=>{
        for(let i=0;i<res.data.length;i++)
        {
            showuserScreen(res.data[i]);
        }
    }).catch(err=>console.log(err))
})
function onsignup(e)
{
    e.preventDefault();
    let username=e.target.name.value;
    let useremail=e.target.email.value;
    let ph=e.target.phone.value
    let obj={username,useremail,ph};
    localStorage.setItem(obj.useremail,JSON.stringify(obj))
    axios.post("https://crudcrud.com/api/396d9c42af7a4463abde369f1acb4623/appointment",obj)
    showuserScreen(obj);

}
function showuserScreen(obj)
{
let inputName=document.getElementById("name");
let inputEmail=document.getElementById("email");
let inputph=document.getElementById("ph_no");    
let li=document.createElement("li");
let nameText=document.createTextNode(obj.username);
let emailText=document.createTextNode(obj.useremail);
let phText=document.createTextNode(obj.ph);
let spaceText=document.createTextNode("  ");
let spaceText1=document.createTextNode("  ");
let btn=document.createElement("button");
let deleteText1=document.createTextNode("Delete");
btn.onclick=()=>{
    localStorage.removeItem(obj.useremail);
    items.removeChild(li);
   axios.get("https://crudcrud.com/api/396d9c42af7a4463abde369f1acb4623/appointment").then((res)=>{
   let id; 
   for(let i=0;i<res.data.length;i++)
    {
        if(res.data[i].useremail==obj.useremail)
        id=res.data[i]._id;
    }
    axios.delete(`https://crudcrud.com/api/396d9c42af7a4463abde369f1acb4623/appointment/${id}`)
   }).catch(err=>console.log(err)) 
    
}
let btn1=document.createElement("button");
let editText=document.createTextNode("Edit");
btn1.onclick=()=>{
inputName.value=obj.username;
inputEmail.value=obj.useremail;
inputph.value=obj.ph;
axios.get("https://crudcrud.com/api/396d9c42af7a4463abde369f1acb4623/appointment").then((res)=>{
   let id; 
   for(let i=0;i<res.data.length;i++)
    {
        if(res.data[i].useremail==obj.useremail)
        id=res.data[i]._id;
    }
    axios.delete(`https://crudcrud.com/api/396d9c42af7a4463abde369f1acb4623/appointment/${id}`)
   }).catch(err=>console.log(err))
localStorage.removeItem(obj.useremail);
items.removeChild(li);
}
btn1.appendChild(editText);
btn.appendChild(deleteText1);
li.appendChild(nameText);
li.appendChild(spaceText);
li.appendChild(emailText);
li.appendChild(spaceText1);
li.appendChild(phText);
li.appendChild(btn1);
li.appendChild(btn);
items.appendChild(li);
inputName.value="";
inputEmail.value="";
inputph.value="";
}
