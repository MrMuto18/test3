/**
 * 📧 Email Service - Web3Forms Integration
 * Access Key: 73145d99-43d2-4fc9-9625-6b43e7a4a81a
 */

const WEB3FORMS_ACCESS_KEY = "73145d99-43d2-4fc9-9625-6b43e7a4a81a";

async function sendOrderNotification(orderData, retryCount = 0) {
    console.log('📄 Bch nab3thou el commande tawa...');

    // 1. Nadhmo el produits fi liste html (Tableau Mzayan)
    const itemsRows = orderData.items.map(item => 
        `<tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${item.price} د.ت</td>
        </tr>`
    ).join('');

    const emailBody = `
        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #2d8659; color: white; padding: 15px; text-align: center; border-radius: 5px;">
                <h2>🛒 طلب جديد #${orderData.orderId}</h2>
            </div>
            <div style="background-color: white; padding: 20px; margin-top: 15px; border-radius: 5px; border: 1px solid #ddd;">
                <h3>👤 معلومات الحريف:</h3>
                <p><strong>الاسم:</strong> ${orderData.customerName}</p>
                <p><strong>الهاتف:</strong> <a href="tel:${orderData.customerPhone}">${orderData.customerPhone}</a></p>
                <p><strong>المنطقة:</strong> ${orderData.customerRegion}</p>
                <p><strong>العنوان:</strong> ${orderData.customerAddress}</p>
                
                <h3>📦 المشتريات:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background-color: #eee;">
                        <th style="padding: 8px; text-align: right;">المنتج</th>
                        <th style="padding: 8px; text-align: center;">الكمية</th>
                        <th style="padding: 8px; text-align: right;">السعر</th>
                    </tr>
                    ${itemsRows}
                </table>
                
                <h3 style="text-align: left; color: #2d8659; margin-top: 20px;">
                    المجموع الكلي: ${orderData.total.toFixed(2)} دينار
                </h3>
            </div>
        </div>
    `;

    // 2. Nhadhrou el Data elli bch temchi l-Web3Forms
    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `🛒 Commande #${orderData.orderId} - ${orderData.customerName}`);
    formData.append("from_name", "Fellahin Store");
    formData.append("message", emailBody);

    // Metadata (bch tchoufhom f-dashboard)
    formData.append("رقم الطلب", orderData.orderId);
    formData.append("اسم الحريف", orderData.customerName);
    formData.append("الهاتف", orderData.customerPhone);
    formData.append("المجموع", `${orderData.total} دينار`);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Email t3adda mriguel!');
            return true;
        } else {
            console.error('❌ Fama ghalta mel Web3Forms:', result.message);
            
            // 🔄 Retry mechanism: na3mlou 3 times max
            if (retryCount < 2) {
                console.log(`🔄 Na3mlou retry... (${retryCount + 1}/2)`);
                await new Promise(resolve => setTimeout(resolve, 2000)); // استنى ثانيتين
                return sendOrderNotification(orderData, retryCount + 1);
            }
            return false;
        }
    } catch (error) {
        console.error('❌ Fama ghalta fil Connexion:', error);
        
        // 🔄 Retry mechanism
        if (retryCount < 2) {
            console.log(`🔄 Na3mlou retry... (${retryCount + 1}/2)`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            return sendOrderNotification(orderData, retryCount + 1);
        }
        return false;
    }
}

// Test function للتأكد من شغل النظام
async function testEmailSystem() {
    console.log('🧪 Testing email system...');
    
    const testOrder = {
        orderId: 'TEST-' + Date.now(),
        customerName: 'محمد التونسي',
        customerPhone: '22123456',
        customerRegion: 'تونس العاصمة',
        customerAddress: 'شارع الحبيب بورقيبة',
        total: 125.50,
        items: [
            { name: 'سماد عضوي', quantity: 2, price: '50.00' },
            { name: 'بذور طماطم', quantity: 1, price: '25.50' }
        ]
    };
    
    const success = await sendOrderNotification(testOrder);
    if (success) {
        console.log('✅ Test passed! Email system working perfectly.');
    } else {
        console.error('❌ Test failed! Check the configuration.');
    }
}

// Export للاستخدام في index.html
window.EmailService = {
    sendOrderNotification,
    testEmailSystem
};

console.log('📧 Email Service loaded successfully!');
