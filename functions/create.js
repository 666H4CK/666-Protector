export async function onRequestPost(context) {

    try {

        const body = await context.request.json();

        const name = body.name;
        const content = body.content;

        if(!name || !content){

            return Response.json({
                success:false,
                error:"Missing Data"
            });
        }

        const githubUser = "TU_USUARIO_GITHUB";
        const githubRepo = "TU_REPO";

        const path = `raw-files/${name}.txt`;

        const api = `https://api.github.com/repos/${githubUser}/${githubRepo}/contents/${path}`;

        const encoded = btoa(unescape(encodeURIComponent(content)));

        const githubResponse = await fetch(api, {
            method:"PUT",
            headers:{
                Authorization:`Bearer ${context.env.GITHUB_TOKEN}`,
                Accept:"application/vnd.github+json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                message:`Create ${name}`,
                content:encoded
            })
        });

        if(!githubResponse.ok){

            const error = await githubResponse.text();

            return Response.json({
                success:false,
                error:error
            });
        }

        return Response.json({
            success:true,
            raw:`https://666-protector.com/api/loader?id=${name}`
        });

    } catch(err){

        return Response.json({
            success:false,
            error:err.toString()
        });

    }
}
