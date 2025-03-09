import { PostCard } from "~/features/community/components/post-card";

export default function ProfilePostsPage() {
	return (
		<div className="flex flex-col gap-5">
			{Array.from({ length: 11 }).map((_, index) => (
				<PostCard
					key={index}
					id={`postId-${index}`}
					title="What is the best productivity tool?"
					author="Nico"
					avatarUrl="https://github.com/apple.png"
					category="Productivity"
					postedAt="12 hours ago"
					expanded
				/>
			))}
		</div>
	);
}
