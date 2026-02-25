import emailjs from 'emailjs-com';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const TEMPLATE_CLIENT = import.meta.env.VITE_EMAILJS_TEMPLATE_CLIENT;
const TEMPLATE_ADMIN = import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN;

export const sendOrderEmails = async (orderData) => {
    try {
        // Formateo de los items para el HTML (idéntico para ambos correos)
        const itemsHtml = orderData.items.map(item => `
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
                <tr style="vertical-align: top">
                    <td style="padding: 12px 8px 0 0; width: 64px">
                        <img style="height: 64px; width: 64px; object-fit: cover; border-radius: 2px;" src="${item.image}" alt="${item.name}" />
                    </td>
                    <td style="padding: 12px 8px 0 8px; width: 100%">
                        <div style="font-family: serif; font-weight: 600; font-size: 14px; color: #333;">${item.name}</div>
                        <div style="font-family: sans-serif; font-size: 12px; color: #888; padding-top: 4px">CANT: ${item.quantity}</div>
                    </td>
                    <td style="padding: 12px 0 0 0; white-space: nowrap; text-align: right;">
                        <strong style="font-family: sans-serif;">$${item.price.toFixed(2)}</strong>
                    </td>
                </tr>
            </table>
        `).join('');

        const templateParams = {
            order_id: orderData.order_id,
            customer_name: orderData.name,
            customer_email: orderData.email,
            email: orderData.email, // Agregado como respaldo por si el dashboard usa {{email}}
            customer_phone: orderData.phone,
            customer_address: orderData.address,
            order_total: orderData.total.toFixed(2),
            order_items_html: itemsHtml,
            admin_email: 'adrian.glez1904@gmail.com'
        };

        // Enviar ambos correos en paralelo
        await Promise.all([
            // 1. Correo al Cliente (variable {{customer_email}} en dashboard)
            emailjs.send(SERVICE_ID, TEMPLATE_CLIENT, templateParams, PUBLIC_KEY),
            // 2. Correo al Admin (variable fija o {{admin_email}} en dashboard)
            emailjs.send(SERVICE_ID, TEMPLATE_ADMIN, templateParams, PUBLIC_KEY)
        ]);

        return { success: true };
    } catch (error) {
        console.error('Error en sendOrderEmails:', error);
        throw error;
    }
};

export const sendOrderEmail = sendOrderEmails;
