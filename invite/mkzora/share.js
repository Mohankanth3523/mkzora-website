/*==================================================
MKZORA Luxury Wedding
share.js
Share • Copy Link • Google Maps
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=================================
    CONFIGURATION
    =================================*/

    const INVITATION_TITLE =
        "💍 Wedding Reception Invitation";

    const INVITATION_TEXT =
`✨ You're cordially invited to celebrate our Wedding Reception.

👰 Premkumar ❤️ Yogavarshini

We would be honored by your presence and blessings.

`;

    const INVITATION_URL = window.location.href;

    // Replace with your actual Google Maps URL
    const MAP_URL =
        "https://maps.google.com/";

    /*=================================
    ELEMENTS
    =================================*/

    const whatsappBtn =
        document.querySelector(".fa-whatsapp")?.parentElement;

    const facebookBtn =
        document.querySelector(".fa-facebook-f")?.parentElement;

    const instagramBtn =
        document.querySelector(".fa-instagram")?.parentElement;

    const copyBtn =
        document.querySelector(".fa-link")?.parentElement;

    const mapBtn =
        document.querySelector(".map-section .gold-btn");

    /*=================================
    NATIVE SHARE
    =================================*/

    async function nativeShare(){

        if(!navigator.share) return false;

        try{

            await navigator.share({

                title:INVITATION_TITLE,

                text:INVITATION_TEXT,

                url:INVITATION_URL

            });

            return true;

        }

        catch(e){

            return false;

        }

    }

    /*=================================
    WHATSAPP
    =================================*/

    if(whatsappBtn){

        whatsappBtn.addEventListener("click",(e)=>{

            e.preventDefault();

            const message =

`${INVITATION_TEXT}

${INVITATION_URL}`;

            window.open(

`https://wa.me/?text=${encodeURIComponent(message)}`,

"_blank"

            );

        });

    }

    /*=================================
    FACEBOOK
    =================================*/

    if(facebookBtn){

        facebookBtn.addEventListener("click",(e)=>{

            e.preventDefault();

            window.open(

`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(INVITATION_URL)}`,

"_blank"

            );

        });

    }

    /*=================================
    INSTAGRAM
    =================================*/

    if(instagramBtn){

        instagramBtn.addEventListener("click",(e)=>{

            e.preventDefault();

            alert(
"Instagram doesn't allow direct web sharing.\n\nThe invitation link has been copied."
            );

            navigator.clipboard.writeText(INVITATION_URL);

        });

    }

    /*=================================
    COPY LINK
    =================================*/

    if(copyBtn){

        copyBtn.addEventListener("click",(e)=>{

            e.preventDefault();

            navigator.clipboard.writeText(

                INVITATION_URL

            ).then(()=>{

                showToast("Invitation link copied.");

            });

        });

    }

    /*=================================
    GOOGLE MAPS
    =================================*/

    if(mapBtn){

        mapBtn.addEventListener("click",(e)=>{

            e.preventDefault();

            window.open(MAP_URL,"_blank");

        });

    }

    /*=================================
    SHARE ON HERO BUTTON
    =================================*/

    const heroBtn = document.querySelector(".gold-btn");

    if(heroBtn){

        heroBtn.addEventListener("contextmenu",async(e)=>{

            e.preventDefault();

            const shared = await nativeShare();

            if(!shared){

                navigator.clipboard.writeText(INVITATION_URL);

                showToast("Link copied.");

            }

        });

    }

    /*=================================
    TOAST MESSAGE
    =================================*/

    function showToast(message){

        const toast=document.createElement("div");

        toast.className="share-toast";

        toast.innerText=message;

        document.body.appendChild(toast);

        setTimeout(()=>{

            toast.classList.add("show");

        },100);

        setTimeout(()=>{

            toast.classList.remove("show");

            setTimeout(()=>{

                toast.remove();

            },300);

        },2500);

    }

});