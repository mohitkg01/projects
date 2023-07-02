const myForm=document.querySelector('#form');
const exp=document.querySelector('#expense');
const desc=document.querySelector('#description');
const cat=document.querySelector('#cateogory');
const detaillist=document.querySelector('#details');

myForm.addEventListener('submit', onSubmit);
detaillist.addEventListener('click', removedetails);

//Adding reterive details
window.addEventListener("DOMContentLoaded",reteriveDetails)

function onSubmit(e){
    e.preventDefault();
    
    if (exp.value === '' || desc.value === '') {
        alert('Please fill in all required fields.');}
    else{
        const li=document.createElement('li');
        li.appendChild(document.createTextNode(`${exp.value}  - ${cat.value}- ${desc.value}`));

        var expe=JSON.stringify(exp.value);

        //Adding delete button
        var delBtn=document.createElement('button');
        delBtn.className='btn btn-secondary btn-sm float-right delete';
        delBtn.appendChild(document.createTextNode('delete'));
        li.appendChild(delBtn);

        //Adding edit btn
        var editBtn=document.createElement('button');
        editBtn.className='btn btn-secondary btn-sm float-right edit';
        editBtn.appendChild(document.createTextNode('edit'));
        li.appendChild(editBtn);

        editBtn.addEventListener('click',editItem);

        //Adding local storage
        localStorage.setItem(expe,`${exp.value} - ${cat.value} - ${desc.value} `)
        exp.value='';
        desc.value='';
        cat.value='';


        //Adding to the list
        detaillist.appendChild(li);
}
}
//remove details
function removedetails(e){
    if(e.target.classList.contains('delete')){
        if(confirm("Are You Sure")){
          var li=e.target.parentElement;
          var expe=JSON.stringify(li.firstChild.textContent.split('-')[0].trim());
          detaillist.removeChild(li);
          localStorage.removeItem(expe);
        }
    }
}

function editItem(e){
    var li=e.target.parentElement;
    var expe=JSON.stringify(li.firstChild.textContent.split('-')[0].trim());
    var desce=li.firstChild.textContent.split('-')[2].trim();
    var cate=li.firstChild.textContent.split('-')[1].trim();

    //setting up the value
    var n=JSON.parse(expe);
    exp.value=n;
    desc.value=desce;
    cat.value=cate;

    detaillist.removeChild(li);
    localStorage.removeItem(expe);
    }

//reterive the data from local storage
function reteriveDetails(){
    for(let i=0;i<localStorage.length;i++){
        const key=localStorage.key(i);
        const value=localStorage.getItem(key);
        const li=document.createElement("li");
        li.appendChild(document.createTextNode(value));

        //adding delete btn
        var delBtn=document.createElement('button');
        delBtn.className='btn btn-secondary btn-sm float-right delete';
        delBtn.appendChild(document.createTextNode('delete'));
        li.appendChild(delBtn);

        //Adding edit btn
        var editBtn=document.createElement('button');
        editBtn.className='btn btn-secondary btn-sm float-right edit';
        editBtn.appendChild(document.createTextNode('edit'));
        li.appendChild(editBtn);
    
        editBtn.addEventListener('click',editItem);
    

        detaillist.appendChild(li);
    }
}