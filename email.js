/**
 * 📧 Email Service - Web3Forms Integration
 * Access Key: 73145d99-43d2-4fc9-9625-6b43e7a4a81a
 */

const WEB3FORMS_ACCESS_KEY = "73145d99-43d2-4fc9-9625-6b43e7a4a81a";

async function sendOrderNotification(orderData) {
    console.log('🔄 Bch nab3thou el commande tawa...');

    // 1. Nadhmo el produits fi liste html (Tableau Mzayan)
    // Hna nekhdhou essem el produit, el quantite, w soumou mel commande s7i7a
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

    // Hna n-hottou el ma3loumet s7i7a k-Metadata (bch tchoufhom f-dashboard ken t7eb)
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
            return false;
        }
    } catch (error) {
        console.error('❌ Fama ghalta fil Connexion:', error);
        return false;
    }
}

// Hathi bch tkhalli index.html ynajem ychouf el function
window.EmailService = {
    sendOrderNotification
};