// get streamerId from url
let streamerId;
let chatContainer;
let channelContainer;

// window.addEventListener('popstate', function() {
//     streamerId = String(window.location.href).split('/')[3];
//     alert(streamerId);
// });

//update: 트위치 -> 채널로 들어갔을 때 안되는 버그 발견 (처음에만 그러는듯), 채팅 밑에 뜨는거 말고 옆에 붙도록

const chattingObserver = new MutationObserver(function (mutations) {
    mutations.forEach((mutation) => {
        if (!mutation.addedNodes[0]) {
            return;
        }
        const newChatLineContainer = mutation.addedNodes[0];
        const userDataContainer = newChatLineContainer.querySelector('.chat-author__display-name');
        if (userDataContainer) {
            const userId = userDataContainer.dataset.aUser;
            const userName = userDataContainer.innerText;
        }
        const messageContainer = newChatLineContainer.querySelector('.text-fragment');
        if (messageContainer) {
            const message = messageContainer.innerText;
            if (message === "ㅋㅋㅋㅋ") {
                const messageBodyContainer = messageContainer.parentNode;
                messageBodyContainer.removeChild(messageContainer);

                var emojiContainer = document.createElement("span");
                emojiContainer.class = "Layout-sc-nxg1ff-0 kqafdi chat-image__container"
                var emojiImg = document.createElement("img");
                emojiImg.src = "https://lh3.googleusercontent.com/6mrwrfIKviXxPf-TrLbcHUzs-cdin_AiRmL8nE-CdECS4-fM1O7q9SoD2YrvEfqM4KXNqfucxt5EIcy-KOtPBm6jXKtr9Nf85SKE=w600";
                emojiImg.width = "35";
                emojiContainer.appendChild(emojiImg);
                messageBodyContainer.appendChild(emojiContainer);
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
    //sideNavObserver.observe(linkContainer, config);
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
