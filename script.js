document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử cần thiết
    const followLinkInput = document.getElementById('follow-link-input');
    
    const copyStep1Btn = document.getElementById('copy-step1-btn');
    const copyStep2Btn = document.getElementById('copy-step2-btn');
    const copyStep3Btn = document.getElementById('copy-step3-btn');

    const scriptUrl1 = document.getElementById('script-url-1').value;
    const scriptUrl2 = document.getElementById('script-url-2').value;
    const scriptUrl3 = document.getElementById('script-url-3').value;

    // Hàm chung để sao chép và hiển thị phản hồi
    function copyToClipboard(text, buttonElement) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = buttonElement.textContent;
            buttonElement.textContent = '✅ Đã chép';
            buttonElement.classList.add('copied');
            
            setTimeout(() => {
                buttonElement.textContent = originalText;
                buttonElement.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Lỗi khi sao chép:', err);
            alert('Không thể sao chép tự động.');
        });
    }

    // Gán sự kiện cho Nút Bước 1
    copyStep1Btn.addEventListener('click', () => {
        const followLink = followLinkInput.value.trim();
        if (!followLink || !followLink.startsWith('https://app.klingai.com/')) {
            alert('Vui lòng nhập link follow hợp lệ của Kling AI!');
            return;
        }

        // Tạo script loader đặc biệt cho Bước 1 (dùng onload và gọi hàm)
        const loaderScript = `var s=document.createElement('script');s.src='${scriptUrl1}';s.onload=function(){runRegistration('${followLink}');};document.head.appendChild(s);`;
        
        copyToClipboard(loaderScript, copyStep1Btn);
    });

    // Gán sự kiện cho Nút Bước 2
    copyStep2Btn.addEventListener('click', () => {
        // Script loader đơn giản cho Bước 2
        const loaderScript = `var s=document.createElement('script');s.src='${scriptUrl2}';document.head.appendChild(s);`;
        copyToClipboard(loaderScript, copyStep2Btn);
    });

    // Gán sự kiện cho Nút Bước 3
    copyStep3Btn.addEventListener('click', () => {
        // Script loader đơn giản cho Bước 3
        const loaderScript = `var s=document.createElement('script');s.src='${scriptUrl3}';document.head.appendChild(s);`;
        copyToClipboard(loaderScript, copyStep3Btn);
    });
});
