import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (userEmail: string, redirectLink: string) => {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: userEmail,
      subject: 'autoshort',
      html: `
        <p>Your short video is ready. Please preview it here:</p>
      
        <p>
          <a href="${redirectLink}">Review Your Video</a>
        </p>
      `,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
