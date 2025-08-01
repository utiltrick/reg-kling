document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const githubUrl = button.dataset.url;
            const outputId = button.dataset.outputId;
            const outputElement = document.getElementById(outputId);

            // Tự động chuyển đổi link raw.githubusercontent sang jsDelivr cho tốc độ nhanh hơn
            // Ví dụ: https://raw.githubusercontent.com/USER/REPO/main/script.js
            // thành: https://cdn.jsdelivr.net/gh/USER/REPO@main/script.js
            const url = new URL(githubUrl);
            const pathParts = url.pathname.split('/');
            const user = pathParts[1];
            const repo = pathParts[2];
            const branch = pathParts[3]; // Giả định 'main' hoặc tên nhánh khác
            const file = pathParts.slice(4).join('/');
            
            const jsDelivrUrl = `https://cdn.jsdelivr.net/gh/${user}/${repo}@${branch}/${file}`;

            // Tạo ra đoạn code loader ngắn gọn để dán vào console
            const loaderScript = `var s=document.createElement('script');s.src='${jsDelivrUrl}';document.head.appendChild(s);`;

            // Sao chép code vào clipboard
            navigator.clipboard.writeText(loaderScript).then(() => {
                // Hiển thị code đã sao chép
                if (outputElement) {
                    outputElement.parentElement.style.display = 'block';
                    outputElement.textContent = loaderScript;
                }

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
                alert('Không thể sao chép tự động, vui lòng thử lại.');
            });
        });
    });
});
