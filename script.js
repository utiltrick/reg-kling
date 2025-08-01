document.addEventListener('DOMContentLoaded', () => {
    // Lắng nghe sự kiện trên toàn bộ document để xử lý các nút bấm
    document.addEventListener('click', function(event) {
        // Chỉ chạy khi người dùng nhấn vào nút có class 'generate-btn'
        if (!event.target.classList.contains('generate-btn')) {
            return;
        }

        const button = event.target;
        // Tìm card cha gần nhất của nút được bấm
        const parentCard = button.closest('.step-card');
        
        // Tìm các phần tử con bên trong card đó
        const inputElement = parentCard.querySelector('.script-input');
        const outputContainer = parentCard.querySelector('.output-code-container');
        const outputCodeElement = outputContainer.querySelector('code');

        const rawUrl = inputElement.value.trim();

        if (!rawUrl) {
            alert('Vui lòng nhập link đến file script!');
            return;
        }

        let finalUrl = rawUrl;
        // Tự động chuyển đổi link raw.githubusercontent sang jsDelivr cho tốc độ nhanh hơn
        if (rawUrl.includes('raw.githubusercontent.com')) {
            try {
                const url = new URL(rawUrl);
                const pathParts = url.pathname.split('/');
                const user = pathParts[1];
                const repo = pathParts[2];
                const branch = pathParts[3];
                const file = pathParts.slice(4).join('/');
                finalUrl = `https://cdn.jsdelivr.net/gh/${user}/${repo}@${branch}/${file}`;
                console.log('Đã chuyển đổi URL sang jsDelivr:', finalUrl);
            } catch (e) {
                console.warn('Không thể chuyển đổi URL, sẽ dùng link gốc.');
            }
        }
        
        // Tạo ra đoạn code loader ngắn gọn để dán vào console
        const loaderScript = `var s=document.createElement('script');s.src='${finalUrl}';document.head.appendChild(s);`;

        // Sao chép code vào clipboard
        navigator.clipboard.writeText(loaderScript).then(() => {
            // Hiển thị code đã sao chép
            outputCodeElement.textContent = loaderScript;
            outputContainer.style.display = 'block';

            // Phản hồi cho người dùng trên nút bấm
            const originalText = button.textContent;
            button.textContent = '✅ Đã sao chép!';
            button.classList.add('copied');

            // Quay lại trạng thái ban đầu sau 2.5 giây
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2500);
        }).catch(err => {
            console.error('Lỗi khi sao chép: ', err);
            alert('Không thể sao chép tự động, vui lòng sao chép thủ công từ ô bên dưới.');
        });
    });
});
