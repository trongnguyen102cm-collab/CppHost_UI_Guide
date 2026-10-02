// Common JavaScript utilities

/**
 * Debounce function - giảm số lần gọi một function
 * @param {Function} func - Function cần debounce
 * @param {number} wait - Thời gian chờ (ms)
 * @returns {Function} - Function được debounce
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function - giới hạn số lần gọi một function
 * @param {Function} func - Function cần throttle
 * @param {number} limit - Thời gian giữa các lần gọi (ms)
 * @returns {Function} - Function được throttle
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Format number theo định dạng VN
 * @param {number} num - Number cần format
 * @returns {string} - Number được format
 */
function formatNumber(num) {
    return new Intl.NumberFormat('vi-VN').format(num);
}

/**
 * Format date theo định dạng VN
 * @param {Date} date - Date cần format
 * @returns {string} - Date được format
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('vi-VN').format(new Date(date));
}

/**
 * Check nếu element visible trong viewport
 * @param {HTMLElement} element - Element cần check
 * @returns {boolean} - True nếu visible
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
