import { StarIcon } from "lucide-react";
import { useState } from "react";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import {
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "~/common/components/ui/dialog";

import { DialogContent } from "~/common/components/ui/dialog";
import { Label } from "~/common/components/ui/label";

export default function CreateReviewDialog() {
	const [rating, setRating] = useState<number>(0);
	const [hoveredStar, setHoveredStar] = useState<number>(0);

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle className="text-2xl">
					What do you think about this product?
				</DialogTitle>
				<DialogDescription>
					Please write a review for the product.
				</DialogDescription>
			</DialogHeader>
			<Form className="space-y-5">
				<div>
					<Label className="flex flex-col gap-1">
						Rating{" "}
						<small className="text-muted-foreground">
							What would you rate this product
						</small>
					</Label>
					<div className="flex gap-2 mt-5">
						{[1, 2, 3, 4, 5].map((star) => (
							<label
								key={star}
								className="relative"
								onMouseEnter={() => setHoveredStar(star)}
								onMouseLeave={() => setHoveredStar(0)}
							>
								<StarIcon
									className="size-5 text-yellow-400"
									fill={
										hoveredStar >= star || rating >= star
											? "currentColor"
											: "none"
									}
								/>
								<input
									type="radio"
									name="rating"
									value={star}
									required
									className="absolute opacity-0 h-px w-px"
									onChange={() => setRating(star)}
								/>
							</label>
						))}
					</div>
				</div>
				<InputPair
					label="Review"
					name="review"
					placeholder="Tell us what you think"
					description="Maximum 1000 characters"
					textArea
					required
				/>
				<DialogFooter>
					<Button type="submit">Submit Review</Button>
				</DialogFooter>
			</Form>
		</DialogContent>
	);
}
