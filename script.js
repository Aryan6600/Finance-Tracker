const addexp = document.querySelector("#addexp")
const grid = document.querySelector('#expensegrid')
addexp.addEventListener('click',()=>{
    const form = document.createElement('form')
    
    const submitbtn = document.createElement('button')
    const cancelBtn = document.createElement('button')
    submitbtn.classList="btn"
    cancelBtn.classList="btn"
    submitbtn.innerText="Add"
    cancelBtn.innerText="Cancel"
    const row=document.createElement('div')
    row.classList='row'
    row.append(cancelBtn,submitbtn)
    const card = document.createElement('div')
    card.classList='card'
    const h2 = document.createElement('h2')
    h2.innerText="Title..."
    h2.setAttribute('contenteditable','')
    const p=document.createElement('p')
    p.innerText="Description..."
    p.setAttribute('contenteditable','')
    const cur=document.createElement("span")
    cur.innerText="$"
    cur.classList="cur"
    const price=document.createElement('span')
    price.setAttribute('contenteditable','')
    price.classList='price'
    price.addEventListener('input',calculatePrice)
    price.innerText="20"
    cur.append(price)
    card.append(h2,p,cur)
    form.append(card,row)
    cancelBtn.addEventListener('click',()=>{form.remove()})
    form.addEventListener('submit',e=>{
        e.preventDefault();
        form.remove()
        const card = addCard(h2.innerText,p.innerText,price.innerText)
        grid.prepend(card)
        parseData()
        calculatePrice()
    })
    grid.prepend(form)
    
})
function addCard(title,desc,price){
    const form=document.createElement('form')
    const submitbtn = document.createElement('button')
    const cancelBtn = document.createElement('button')
    submitbtn.classList="btn"
    submitbtn.type="submit"
    cancelBtn.type="reset"
    cancelBtn.classList="btn"
    submitbtn.innerText="Add"
    cancelBtn.innerText="Cancel"
    const row=document.createElement('div')
    row.classList='row'
    row.style.display="none"
    row.append(cancelBtn,submitbtn)
    const del = document.createElement('span')
    del.innerHTML="&times;"
    del.classList='del'
    const card = document.createElement('div')
    card.classList='card'
    card.append(del)
    const h2 = document.createElement('h2')
    h2.innerText=title
    const p=document.createElement('p')
    p.innerText=desc
    const cur=document.createElement("span")
    cur.innerText="$"
    cur.classList="cur"
    const price_span=document.createElement('span')
    price_span.classList='price'
    price_span.innerText=price
    cur.append(price_span)
    card.append(h2,p,cur)
    form.append(card,row)
    del.addEventListener('click',()=>{form.remove();calculatePrice()})
    card.addEventListener('dblclick',()=>{
        const prev_h2 = h2.innerText
        const prev_p = p.innerText
        const prev_price_span = price_span.innerText
        cancelBtn.addEventListener('click',()=>{
            price_span.setAttribute('contenteditable',false)
            h2.setAttribute('contenteditable',false)
            p.setAttribute('contenteditable',false)
            row.style.display="none"
            price_span.innerText=prev_price_span
            p.innerText=prev_p
            h2.innerText=prev_h2
        })
        row.style.display="flex"
        price_span.setAttribute('contenteditable','')
        h2.setAttribute('contenteditable','')
        p.setAttribute('contenteditable','')
        del.style.display="none"
        price_span.addEventListener('input',calculatePrice)
    })
    form.addEventListener('submit',(e)=>{
        e.preventDefault()            
        price_span.setAttribute('contenteditable',false)
        h2.setAttribute('contenteditable',false)
        p.setAttribute('contenteditable',false)
        row.style.display="none"
        del.style.display="inline-block"
        // console.log("Parsing on submit");
        parseData()
    })
    return form
}

function calculatePrice(){
    const cards = document.querySelectorAll('.card')
    let price = 0;
    cards.forEach(card=>{        
        const price_el = card.querySelector('.price')
        if(typeof(Number(price.innerText))==typeof(10)) price+=Number(price_el.innerText)
    })
    const total = document.querySelector('#total')
    total.innerText="$ "+price
    // return price
}


function parseData(){
    const cards = document.querySelectorAll('.card')
    let data =[]
    cards.forEach(card=>{
        // console.log(card)
        const h2 = card.querySelector('h2').innerText      
        const p = card.querySelector('p').innerText      
        const price = card.querySelector('.price').innerText  
        data.push({title:h2,description:p,price:price})    
    })
    if(data.length==0) return
    localStorage.setItem('data',JSON.stringify(data))
}

function loadData(){
    const data = JSON.parse(localStorage.getItem('data'))
    // console.log(data);
    data.forEach(todo=>{
        const card = addCard(todo.title,todo.description,todo.price)
        grid.append(card)
    })
    return "Done"
}
document.addEventListener('DOMContentLoaded',()=>{loadData();calculatePrice()})
parseData()