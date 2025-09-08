import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOrderConfirmation = async (to, order) => {
  const html = `
    <h2>Order confirmed</h2>
    <p>ID: ${order._id}</p>
    <p>Total: $${order.totalPrice.toFixed(2)}</p>
    <p>We'll notify you once shipped.</p>
  `;
  await transporter.sendMail({
    from: `"ShopSmart" <${process.env.SMTP_USER}>`,
    to,
    subject: `Order ${order._id} confirmed`,
    html,
  });
};
