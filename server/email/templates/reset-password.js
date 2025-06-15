function resetPasswordTemplate({ username, resetLink }) {
  const year = new Date().getFullYear();

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          Password Reset
        </h1>
        <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">
          Secure • Fast • Simple
        </p>
      </div>
      <div style="padding: 40px 30px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #2d3748; margin: 0 0 15px; font-size: 24px; font-weight: 600;">
            Hi ${username}! 👋
          </h2>
          <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0;">
            We received a request to reset your password. Don't worry, we've got you covered!
          </p>
        </div>
        <div style="text-align: center; margin: 40px 0;">
          <a href="${resetLink}" style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 50px;
            display: inline-block;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
          " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(102, 126, 234, 0.6)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(102, 126, 234, 0.4)';">
            🔐 Reset My Password
          </a>
        </div>
        <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #667eea;">
          <p style="color: #4a5568; font-size: 14px; margin: 0 0 10px; font-weight: 600;">
            Button not working? Copy and paste this link:
          </p>
          <p style="color: #667eea; font-size: 14px; word-break: break-all; margin: 0; font-family: monospace; background-color: #ffffff; padding: 10px; border-radius: 4px; border: 1px solid #e2e8f0;">
            ${resetLink}
          </p>
        </div>
        <div style="background: linear-gradient(135deg, #fef5e7 0%, #fdf2e9 100%); padding: 20px; border-radius: 8px; margin: 30px 0; border: 1px solid #fed7aa;">
          <div style="display: flex; align-items: flex-start;">
            <div style="margin-right: 12px; font-size: 20px;">⚠️</div>
            <div>
              <p style="color: #c05621; font-size: 14px; margin: 0 0 8px; font-weight: 600;">
                Security Notice
              </p>
              <p style="color: #9c4221; font-size: 14px; margin: 0; line-height: 1.5;">
                This link will expire in <strong>15 minutes</strong> for your security. If you didn't request this reset, please ignore this email or contact our support team.
              </p>
            </div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e2e8f0;">
          <p style="color: #718096; font-size: 14px; margin: 0 0 15px;">
            Need help? We're here for you!
          </p>
          <a href="mailto:mohdasad69690@gmail.com" style="
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            padding: 8px 16px;
            border: 2px solid #667eea;
            border-radius: 20px;
            display: inline-block;
            transition: all 0.3s ease;
          " onmouseover="this.style.backgroundColor='#667eea'; this.style.color='#ffffff';" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#667eea';">
            📧 Contact Support
          </a>
        </div>
      </div>
      <div style="background-color: #f7fafc; padding: 30px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e2e8f0;">
        <div style="margin-bottom: 10px;">
          <div style="display: inline-block; width: 45px; height: 45px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; margin: auto; position: relative;">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-weight: bold; font-size: 18px;">DG</div>
          </div>
        </div>
        <p style="color: #a0aec0; font-size: 12px; margin: 0 0 10px;">
          © ${year} Digital Guardians. All rights reserved.
        </p>
      </div>
    </div>
  `;
}

export default resetPasswordTemplate;
