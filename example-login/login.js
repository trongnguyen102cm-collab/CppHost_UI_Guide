const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const alertContainer = document.getElementById("alertContainer");

// Event listeners
loginForm.addEventListener("submit", handleLogin);
usernameInput.addEventListener("focus", clearAlert);
passwordInput.addEventListener("focus", clearAlert);

/**
 * Xử lý đăng nhập
 */
async function handleLogin(event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Validation phía client
    if (!username || !password) {
        showAlert("danger", "Vui lòng nhập đủ tên đăng nhập và mật khẩu");
        return;
    }

    if (username.length < 3) {
        showAlert("warning", "Tên đăng nhập phải ít nhất 3 ký tự");
        return;
    }

    if (password.length < 6) {
        showAlert("warning", "Mật khẩu phải ít nhất 6 ký tự");
        return;
    }

    // Hiển thị loading state
    setButtonLoading(true);
    clearAlert();

    try {
        // Giả lập API call (thay bằng /api/login thật)
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            showAlert("danger", data.message || "Tên đăng nhập hoặc mật khẩu không đúng");
            return;
        }

        // Thành công
        showAlert("success", "Đăng nhập thành công! Đang chuyển hướng...");

        // Chuyển hướng sau 1.5 giây
        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 1500);
    } catch (error) {
        console.error("Login error:", error);
        showAlert("danger", "Lỗi kết nối. Vui lòng kiểm tra đường truyền và thử lại.");
    } finally {
        setButtonLoading(false);
    }
}

/**
 * Thay đổi trạng thái loading của button
 */
function setButtonLoading(isLoading) {
    if (isLoading) {
        loginButton.disabled = true;
        loginButton.classList.add("is-loading");
        loginButton.innerHTML = '<span class="spinner-inline"></span><span class="btn-text">Đang đăng nhập...</span>';
    } else {
        loginButton.disabled = false;
        loginButton.classList.remove("is-loading");
        loginButton.innerHTML = '<span class="btn-text">Đăng Nhập</span>';
    }
}

/**
 * Hiển thị thông báo alert
 */
function showAlert(type, message) {
    const icons = {
        success: "✓",
        warning: "⚠",
        danger: "✕",
        info: "ⓘ",
    };

    const titles = {
        success: "Thành công",
        warning: "Cảnh báo",
        danger: "Lỗi",
        info: "Thông tin",
    };

    const alertHTML = `
        <div class="alert alert-${type}">
            <div class="alert-icon">${icons[type]}</div>
            <div class="alert-content">
                <div class="alert-title">${titles[type]}</div>
                ${message}
            </div>
        </div>
    `;

    alertContainer.innerHTML = alertHTML;
    alertContainer.style.display = "block";
}

/**
 * Xóa thông báo alert
 */
function clearAlert() {
    alertContainer.innerHTML = "";
    alertContainer.style.display = "none";
}

// Focus vào input username khi trang load
window.addEventListener("DOMContentLoaded", () => {
    usernameInput.focus();
});
