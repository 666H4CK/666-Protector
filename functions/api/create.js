function encodeBase64UTF8(str){

const bytes =
new TextEncoder().encode(str);

let binary = "";

bytes.forEach(byte=>{
binary += String.fromCharCode(byte);
});

return btoa(binary);

}

export async function onRequestPost(context){

try{

const body =
await context.request.json();

const name =
String(body.name || "")
.trim()
.replace(/\s+/g,"_")
.replace(/[^a-zA-Z0-9_-]/g,"")
.slice(0,15);

const content =
String(body.content || "");

if(!name || !content){

return Response.json({
success:false,
error:"Missing Data"
});

}

const githubUser =
"666H4CK";

const githubRepo =
"666-Protector";

const path =
`raw-files/${name}.txt`;

const api =
`https://api.github.com/repos/${githubUser}/${githubRepo}/contents/${path}`;

let sha = undefined;

const existing =
await fetch(api,{

headers:{
Authorization:
`Bearer ${context.env.GITHUB_TOKEN}`,
Accept:
"application/vnd.github+json"
}

});

if(existing.ok){

const existingData =
await existing.json();

sha =
existingData.sha;

}

const response =
await fetch(api,{

method:"PUT",

headers:{

Authorization:
`Bearer ${context.env.GITHUB_TOKEN}`,

Accept:
"application/vnd.github+json",

"Content-Type":
"application/json"

},

body:JSON.stringify({

message:
sha
? `Update ${name}`
: `Create ${name}`,

content:
encodeBase64UTF8(content),

...(sha ? { sha } : {})

})

});

if(!response.ok){

const error =
await response.text();

return Response.json({
success:false,
error
});

}

return Response.json({

success:true,

raw:
`https://666-protector.pages.dev/loader/${name}`

});

}catch(err){

return Response.json({

success:false,
error:err.toString()

});

}

}
