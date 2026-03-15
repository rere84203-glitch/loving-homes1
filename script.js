document.addEventListener('DOMContentLoaded', function() {
    // إعدادات الوصول (تكبير الخط - الوضع الليلي)
    const body = document.body; // الوصول إلى عنصر الصفحة بالكامل
    let currentFontSize = 16;   // الحجم الافتراضي للخط
    // دالة تكبير الخط
    function increaseFont() {
        currentFontSize += 2; // زيادة حجم الخط
        if (currentFontSize > 30) currentFontSize = 30; // الحد الأعلى
        body.style.fontSize = currentFontSize + 'px';} // تطبيق الحجم
    // دالة تصغير الخط
    function decreaseFont() {
        currentFontSize -= 2; // تقليل حجم الخط
        if (currentFontSize < 10) currentFontSize = 10; // الحد الأدنى
        body.style.fontSize = currentFontSize + 'px';}
    // إعادة الخط للحجم الافتراضي
    function resetFont() {
        currentFontSize = 16;
        body.style.fontSize = '16px';}
    // تشغيل أو إيقاف الوضع الليلي
    function toggleNightMode() {
        body.classList.toggle('night-mode');}
    // ربط الأزرار بالدوال الخاصة بها
    document.getElementById('increase-font')?.addEventListener('click', increaseFont);
    document.getElementById('decrease-font')?.addEventListener('click', decreaseFont);
    document.getElementById('reset-font')?.addEventListener('click', resetFont);
    document.getElementById('night-mode')?.addEventListener('click', toggleNightMode);
    // الأزرار العائمة
    document.getElementById('increase-font-float')?.addEventListener('click', increaseFont);
    document.getElementById('decrease-font-float')?.addEventListener('click', decreaseFont);
    document.getElementById('night-mode-float')?.addEventListener('click', toggleNightMode);
    // قائمة الجوال (المينيو)
    const menuToggle = document.getElementById('menu-toggle'); // زر القائمة
    const navMenu = document.getElementById('nav-menu');       // قائمة الروابط
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');});} // إظهار أو إخفاء القائمة
    // إغلاق القائمة عند الضغط على أي رابط
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');}});});
    // نموذج الحجز
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault(); // منع إعادة تحميل الصفحة
            //  قيم الحقول
            const owner = document.getElementById('ownerName')?.value.trim();
            const dog = document.getElementById('dogName')?.value.trim();
            const phone = document.getElementById('phone')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const arrival = document.getElementById('arrival')?.value;
            const departure = document.getElementById('departure')?.value;
            // التحقق من أن جميع الحقول ممتلئة
            if (!owner || !dog || !phone || !email || !arrival || !departure) {
                showFeedback('جميع الحقول المطلوبة يجب تعبئتها.', 'error');
                return;}
            // التحقق من صحة البريد الإلكتروني
            if (!email.includes('@') || !email.includes('.')) {
                showFeedback('البريد الإلكتروني غير صحيح.', 'error');
                return;}
            // التحقق من صحة التواريخ
            if (new Date(arrival) >= new Date(departure)) {
                showFeedback('تاريخ المغادرة يجب أن يكون بعد تاريخ الوصول.', 'error');
                return;}
            // تشغيل صوت عند نجاح العملية
            try {
                const audio = new Audio('sounds/notification.mp3');
                audio.play().catch(e => console.log('صوت غير متاح'));} catch (e) {}
            // عرض رسالة نجاح
            showFeedback('تم إرسال طلب الحجز بنجاح! سنتواصل معك قريبًا.', 'success');
            // إعادة تعيين الحقول
            bookingForm.reset();});}
    // عرض رسالة الخطأ أو النجاح لنموذج الحجز
    function showFeedback(message, type) {
        const feedback = document.getElementById('formFeedback');
        if (!feedback) return;
        feedback.innerHTML =
        `<div class="${type === 'error' ? 'error-message' : 'success-message'}">
        ${message}
        </div>`;}
    // نموذج الاتصال
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // منع إعادة تحميل الصفحة
            const name = document.getElementById('contactName')?.value.trim();
            const email = document.getElementById('contactEmail')?.value.trim();
            const msg = document.getElementById('contactMsg')?.value.trim();
            // التحقق من الحقول
            if (!name || !email || !msg) {
                showContactFeedback('يرجى تعبئة جميع الحقول.', 'error');
                return;}
            // رسالة نجاح
            showContactFeedback('تم إرسال رسالتك، سنرد عليك قريبًا.', 'success');
            contactForm.reset();});}
    // عرض رسالة لنموذج الاتصال
    function showContactFeedback(message, type) {
        const feedback = document.getElementById('contactFeedback');
        if (!feedback) return;
        feedback.innerHTML =
        `<div class="${type === 'error' ? 'error-message' : 'success-message'}">
        ${message}
        </div>`;}
    // قسم الأسئلة الشائعة FAQ
    // عند الضغط على السؤال يتم فتح أو إغلاق الجواب
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('open');
        });});});