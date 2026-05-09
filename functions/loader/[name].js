function fakeHtml(){

return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>666 PROTECTOR</title>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Inter,Arial,sans-serif;
}

body{
height:100vh;
overflow:hidden;
display:flex;
justify-content:center;
align-items:center;
background:#050505;
color:white;
padding:25px;
}

.bg{
position:fixed;
inset:0;

background:
radial-gradient(circle at top,#420000 0%,#050505 45%),
radial-gradient(circle at bottom,#180000 0%,#000000 70%);

animation:bgMove 8s infinite alternate;
}

@keyframes bgMove{

from{
transform:scale(1);
}

to{
transform:scale(1.08);
}

}

.card{

position:relative;

width:800px;
max-width:100%;

padding:45px;

border-radius:42px;

background:
rgba(12,12,12,.82);

border:
1px solid rgba(255,0,0,.12);

backdrop-filter:blur(18px);

box-shadow:
0 0 70px rgba(255,0,0,.18),
inset 0 0 35px rgba(255,0,0,.04);

text-align:center;

animation:intro .9s cubic-bezier(.17,.89,.32,1.28);

overflow:hidden;
}

@keyframes intro{

from{
opacity:0;
transform:
translateY(70px)
scale(.85);
}

to{
opacity:1;
transform:
translateY(0px)
scale(1);
}

}

.glow{

position:absolute;

width:350px;
height:350px;

background:red;

filter:blur(160px);

opacity:.20;

top:-180px;
left:50%;

transform:translateX(-50%);
}

.logo{

width:110px;
height:110px;

margin:auto;
margin-bottom:22px;

border-radius:34px;

background:
linear-gradient(145deg,#ff0000,#650000);

box-shadow:
0 0 45px rgba(255,0,0,.45);

}

h1{

font-size:55px;

letter-spacing:6px;

font-weight:900;

color:#ff2d2d;

text-shadow:
0 0 25px rgba(255,0,0,.7);

}

p{

margin-top:14px;

font-size:17px;

color:#b0b0b0;
}

.badge{

display:inline-flex;

justify-content:center;
align-items:center;

margin-top:28px;

padding:16px 34px;

border-radius:24px;

background:
linear-gradient(145deg,#ff0000,#650000);

font-weight:800;

letter-spacing:2px;

box-shadow:
0 0 35px rgba(255,0,0,.24);

}

</style>
</head>

<body>

<div class="bg"></div>

<div class="card">

<div class="glow"></div>

<div class="logo"></div>

<h1>666 PROTECTOR</h1>

<p>
THIS SCRIPT WAS PROTECTED BY
666 PROTECTOR
</p>

<p>
Only Roblox can access this content.
</p>

<div class="badge">
666-PROTECTOR
</div>

</div>

</body>
</html>
`;

}

export async function onRequest(context){

try{

const name =
String(context.params.name || "");

const userAgent =
(
context.request.headers.get("user-agent")
|| ""
).toLowerCase();

const isRoblox =
userAgent.includes("roblox");

if(!name){

return new Response(
"-- Missing Script Name --",
{ status:400 }
);

}

if(!isRoblox){

return new Response(
fakeHtml(),
{
status:200,
headers:{
"Content-Type":
"text/html; charset=UTF-8"
}
}
);

}

const githubUser =
"TU_USUARIO";

const githubRepo =
"TU_REPO";

const response =
await fetch(

`https://api.github.com/repos/${githubUser}/${githubRepo}/contents/raw-files/${name}.txt`,

{

headers:{

Authorization:
`Bearer ${context.env.GITHUB_TOKEN}`,

Accept:
"application/vnd.github.raw",

"User-Agent":
"666-PROTECTOR"

}

}

);

if(!response.ok){

return new Response(
"-- Script Not Found --",
{ status:404 }
);

}

const script =
await response.text();

return new Response(
script,
{
status:200,
headers:{
"Content-Type":"text/plain",
"Cache-Control":"no-store"
}
}
);

}catch{

return new Response(
"-- Internal Server Error --",
{ status:500 }
);

}

}
