document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử cần thiết
    const followLinkInput = document.getElementById('follow-link-input');
    
    const copyStep1Btn = document.getElementById('copy-step1-btn');
    const copyStep2Btn = document.getElementById('copy-step2-btn');
    const copyStep3Btn = document.getElementById('copy-step3-btn');

    const scriptUrl1 = document.getElementById('script-url-1').value;
    const scriptUrl2 = document.getElementById('script-url-2').value;
    const scriptUrl3 = document.getElementById('script-url-3').value;

    // Hàm hiển thị phản hồi trên nút bấm
    function showCopiedFeedback(button) {
        const originalText = button.textContent;
        button.textContent = '✅ Đã chép';
        button.classList.add('copied');
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }

    // Gán sự kiện cho Nút Bước 1
    copyStep1Btn.addEventListener('click', () => {
        const followLink = followLinkInput.value.trim();
        if (!followLink || !followLink.startsWith('https://app.klingai.com/')) {
            alert('Vui lòng nhập link follow hợp lệ của Kling AI!');
            return;
        }

        // Tạo script loader đặc biệt cho Bước 1
        const loaderScript = `window.KLING_FOLLOW_LINK='${followLink}';var s=document.createElement('script');s.src='${scriptUrl1}';document.head.appendChild(s);`;
        
        navigator.clipboard.writeText(loaderScript);
        showCopiedFeedback(copyStep1Btn);
    });

    // Gán sự kiện cho Nút Bước 2
    copyStep2Btn.addEventListener('click', () => {
        const loaderScript = `var s=document.createElement('script');s.src='${scriptUrl2}';document.head.appendChild(s);`;
        navigator.clipboard.writeText(loaderScript);
        showCopiedFeedback(copyStep2Btn);
    });

    // Gán sự kiện cho Nút Bước 3
    copyStep3Btn.addEventListener('click', () => {
        const loaderScript = `var s=document.createElement('script');s.src='${scriptUrl3}';document.head.appendChild(s);`;
        navigator.clipboard.writeText(loaderScript);
        showCopiedFeedback(copyStep3Btn);
    });
});
