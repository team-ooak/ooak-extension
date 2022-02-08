// get streamerId from url
let chatContainer;
let channelContainer;


// window.addEventListener('popstate', function() {
//     streamerId = String(window.location.href).split('/')[3];
//     alert(streamerId);
// });

// 1. ID tag 이미지 추가
// 2. id team_ooak 인식 후 OOAK로 바꾸자
// 3. Emotes
// 4. 스위치 on/off
const EMOTE_LINK = "https://gateway.pinata.cloud/ipfs/QmagcKVZVySuAL75dqy3jMwamQJ3KaV4YG9Ck1SCR3hX6o";
const ID_TAG_LINK = "https://gateway.pinata.cloud/ipfs/QmfEPMHpuz1ydAyhijMvpXZZEWJhFYBA3k3GbvTyNjbckn";

const chattingObserver = new MutationObserver(function (mutations) {
    mutations.forEach((mutation) => {
        if (!mutation.addedNodes[0]) {
            return;
        }
        const newChatContainer = mutation.addedNodes[0];
        const userDataContainer = newChatContainer.querySelector('.chat-author__display-name');
        if (userDataContainer) {
            const streamerId = userDataContainer.dataset.aUser;
            const streamerName = userDataContainer.innerText;
        }
        const chatLineContainer = newChatContainer.querySelector('.text-fragment');
        if (chatLineContainer) {
            //tag 넣기 usernameContainer 2번째 자식으로 넣기
            const usernameContainer = newChatContainer.querySelector('.chat-line__username-container');
            const idTagBadgeContainer = document.createElement("span");
            const idTagImg = document.createElement("img");
            
            idTagImg.src = ID_TAG_LINK;
            idTagImg.width = '22';
            idTagBadgeContainer.appendChild(idTagImg);
            
            const chatLineUsername = usernameContainer.querySelector('.chat-line__username');
            if (usernameContainer)
                usernameContainer.insertBefore(idTagBadgeContainer, chatLineUsername);
            //id => nickname(id tag)로 변경
            const displayName = chatLineUsername.querySelector('.chat-author__display-name');
            if (displayName.dataset.aUser === 'team_ooak'){
                displayName.innerText = "TEAM_OOAK";
                displayName.nextSibling.innerText = "";
            }
            


            //message 처리
            const message = chatLineContainer.innerText;
            // + 정규식 추출
            if (message === "_OOAK") {
                const messageBodyContainer = chatLineContainer.parentNode;
                messageBodyContainer.removeChild(chatLineContainer);

                var emoteContainer = document.createElement("span");
                emoteContainer.class = "Layout-sc-nxg1ff-0 kqafdi chat-image__container"
                var emoteImg = document.createElement("img");
                // emoteImg.src = "https://lh3.googleusercontent.com/6mrwrfIKviXxPf-TrLbcHUzs-cdin_AiRmL8nE-CdECS4-fM1O7q9SoD2YrvEfqM4KXNqfucxt5EIcy-KOtPBm6jXKtr9Nf85SKE=w600";
                emoteImg.src = EMOTE_LINK;
                emoteImg.width = "25";
                emoteContainer.appendChild(emoteImg);
                messageBodyContainer.appendChild(emoteContainer);
            }
        }
    });
});

const twilightMainObserver = new MutationObserver(function (mutations) {
    chatContainer = document.querySelector('.chat-scrollable-area__message-container');
    //load가 다 안돼서 chatContainer가 null값이 뜨는게 아닌가 싶은데
    if(chatContainer){
        observeNewChatMessage(chatContainer);
    }

});

function observeNewChatMessage(chatContainer) {
    const config = { attributes: false, childList: true, characterData: false };
    chattingObserver.observe(chatContainer, config);
}

window.onload = function () {
    const linkContainer = document.querySelectorAll('.ScCoreLink-sc-udwpw5-0')[1];
    const config = { subtree: false, childList: false, attributes: true };
    const twilightMain = document.querySelector('.twilight-main');
    const config2 = { subtree: true, childList: true, attributes: false };
    twilightMainObserver.observe(twilightMain, config2);

    chatContainer = document.querySelector('.chat-scrollable-area__message-container');
    if(chatContainer){
        observeNewChatMessage(chatContainer);
    }
}













// 트위치 -> 채널로 들어가는 경로 : 1. chatContainer null일 때 2. sidenav
// 바로 url로 채널로 들어가는 경로: 문제 없음



//<a aria-label="탐색 건너뛰기" class="ScCoreLink-sc-udwpw5-0 ffziHP tw-link" href="/#sideNav"><div class="top-nav__skip-nav-link">탐색 건너뛰기</div></a>
