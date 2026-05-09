export async function onRequest(context) {

  try {

    const url = new URL(context.request.url);
    const id = url.searchParams.get("id");

    const userAgent = context.request.headers.get("user-agent") || "";

    const isRoblox = userAgent.toLowerCase().includes("roblox");

    if (!id) {
      return new Response("-- Missing Script ID --", {
        status: 400
      });
    }

    // =========================
    // HTML FAKE
    // =========================

    if (!isRoblox) {

      return new Response(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>666 PROTECTOR</title>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Arial;
}

body{
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:#050505;
overflow:hidden;
color:white;
}

.bg{
position:fixed;
inset:0;
background:
radial-gradient(circle at center,#450000 0%,#000000 70%);
animation:bg 6s infinite alternate;
}

@keyframes bg{
from{
transform:scale(1);
}

to{
transform:scale(1.08);
}
}

.card{
position:relative;
width:700px;
max-width:90%;
padding:50px;
background:rgba(15,15,15,0.85);
backdrop-filter:blur(18px);
border-radius:40px;
border:1px solid rgba(255,0,0,0.15);
text-align:center;
box-shadow:
0 0 60px rgba(255,0,0,0.20),
inset 0 0 25px rgba(255,0,0,0.05);

animation:intro 1s cubic-bezier(.17,.89,.32,1.28);
}

@keyframes intro{
from{
opacity:0;
transform:translateY(60px) scale(0.85);
}

to{
opacity:1;
transform:translateY(0px) scale(1);
}
}

.glow{
position:absolute;
width:300px;
height:300px;
background:red;
filter:blur(160px);
opacity:0.25;
left:50%;
top:-180px;
transform:translateX(-50%);
}

.logo{
width:120px;
height:120px;
border-radius:50%;
background:linear-gradient(145deg,#ff0000,#5e0000);
margin:auto;
margin-bottom:20px;
box-shadow:0 0 40px rgba(255,0,0,0.5);
}

h1{
font-size:50px;
letter-spacing:5px;
color:#ff2d2d;
text-shadow:0 0 25px red;
}

p{
margin-top:15px;
font-size:18px;
color:#bdbdbd;
}

a{
display:inline-block;
margin-top:25px;
padding:16px 35px;
border-radius:25px;
background:linear-gradient(145deg,#ff0000,#5e0000);
text-decoration:none;
color:white;
font-weight:700;
transition:0.3s;
}

a:hover{
transform:translateY(-4px);
box-shadow:0 0 40px rgba(255,0,0,0.4);
}

</style>
</head>
<body>

<div class="bg"></div>

<div class="card">

<div class="glow"></div>
<div class="logo"></div>

<h1>666 PROTECTOR</h1>

<p>THIS SCRIPT WAS PROTECTED BY 666 PROTECTOR</p>

<p>Only Roblox can access this protected content.</p>

<a href="https://666-protector.com/">
666-PROTECTOR.COM
</a>

</div>

</body>
</html>
      `,
      {
        status:200,
        headers:{
          "Content-Type":"text/html; charset=UTF-8"
        }
      });
    }

    // =========================
    // SCRIPT REAL
    // =========================

    const githubUser = "666H4CK";
    const githubRepo = "666-Protector";

    const githubResponse = await fetch(
      `https://api.github.com/repos/${githubUser}/${githubRepo}/contents/raw-files/${id}.txt`,
      {
        headers: {
          Authorization: `Bearer ${context.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.raw",
          "User-Agent": "666-PROTECTOR",
          "X-GitHub-Api-Version": "2022-11-28"
        },
      }
    );

    if (!githubResponse.ok) {
      return new Response("-- Script Not Found --", {
        status: 404
      });
    }

    const script = await githubResponse.text();

    return new Response(script, {
      status:200,
      headers:{
        "Content-Type":"text/plain",
        "Cache-Control":"no-store"
      }
    });

  } catch (error) {

    return new Response("-- Internal Server Error --", {
      status:500
    });

  }
}
