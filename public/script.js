const fileInput = document.getElementById("fileInput");
const scriptContent = document.getElementById("scriptContent");
const createBtn = document.getElementById("createBtn");
const result = document.getElementById("result");

fileInput.addEventListener("change", async (e)=>{

    const file = e.target.files[0];

    if(!file) return;

    const text = await file.text();

    scriptContent.value = text;

});

createBtn.addEventListener("click", async ()=>{

    const name = document.getElementById("scriptName").value.trim();
    const content = scriptContent.value;

    if(!name){
        alert("Pon nombre al script");
        return;
    }

    if(!content){
        alert("Pon script Lua");
        return;
    }

    createBtn.innerText = "CREATING...";
    createBtn.disabled = true;

    try{

        const response = await fetch("/api/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                content
            })
        });

        const data = await response.json();

        if(!data.success){
            throw new Error(data.error || "Error");
        }

        result.innerHTML = `
        <div class="resultBox">

            <h3>LOADSTRING GENERATED</h3>

            <textarea readonly>
loadstring(game:HttpGet("${data.raw}"))()
            </textarea>

        </div>
        `;

    }catch(err){

        alert(err.message);

    }

    createBtn.innerText = "CREATE SCRIPT";
    createBtn.disabled = false;

});
