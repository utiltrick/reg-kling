document.addEventListener('DOMContentLoaded', () => {
    const followLinkInput = document.getElementById('follow-link-input');
    const scriptUrls = {
        1: document.getElementById('script-url-1').value,
        2: document.getElementById('script-url-2').value,
        3: document.getElementById('script-url-3').value,
    };

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

    // Lắng nghe sự kiện click trên toàn bộ container để xử lý các nút bấm
    document.querySelector('.container').addEventListener('click', (event) => {
        const button = event.target.closest('.copy-btn');
        if (!button) return; // Không phải nút copy thì bỏ qua

        const type = button.dataset.type; // 'script' hoặc 'function'
        const step = button.dataset.step; // '1', '2', hoặc '3'
        const scriptUrl = scriptUrls[step];
        
        let textToCopy = '';

        if (type === 'script') {
            // Tạo mã để tải script
            textToCopy = `var s=document.createElement('script');s.src='${scriptUrl}';document.head.appendChild(s);`;
        } else if (type === 'function') {
            // Tạo mã để gọi hàm tương ứng
            switch (step) {
                case '1':
                    const followLink = followLinkInput.value.trim();
                    if (!followLink || !followLink.startsWith('https://app.klingai.com/')) {
                        alert('Vui lòng nhập link follow hợp lệ của Kling AI!');
                        return;
                    }
                    textToCopy = `runRegistration('${followLink}');`;
                    break;
                case '2':
                    textToCopy = `runFollow();`;
                    break;
                case '3':
                    textToCopy = `runSignOut();`;
                    break;
            }
        }

        if (textToCopy) {
            copyToClipboard(textToCopy, button);
        }
    });
});
