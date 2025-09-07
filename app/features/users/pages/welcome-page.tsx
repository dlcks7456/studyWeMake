import { Resend } from "resend";
import { render } from "@react-email/components";
import { WelcomeUserEmail } from "react-email-starter/emails/welcome-user";
import type { Route } from "./+types/welcome-page";

const client = new Resend(process.env.RESEND_API_KEY);

export const loader = async ({ params }: Route.LoaderArgs) => {
	const { data, error } = await client.emails.send({
		from: "Chuck <chuck@mail.chachachanchacha.xyz>",
		to: ["dlcks17@naver.com"],
		subject: "Welcome to Chachachanchacha",
		react: <WelcomeUserEmail username={params.username} />,
	});
	return Response.json({ data, error });
};
