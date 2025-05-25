import { makeSSRClient } from "~/supa-client";

export const checkUsernameExists = async (
	request: Request,
	{ username }: { username: string },
) => {
	const { client } = makeSSRClient(request);
	const { error } = await client
		.from("profiles")
		.select("profile_id")
		.eq("username", username)
		.single(); // 에러가 발생하지 않았다면, username이 존재한다는 것

	if (error) {
		return false;
	}

	return true;
};
