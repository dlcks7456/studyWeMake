import { useState } from "react";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export default function SelectPair({
	name,
	required,
	label,
	description,
	placeholder,
	options,
	defaultValue,
}: {
	name: string;
	required: boolean;
	label: string;
	description: string;
	placeholder: string;
	options: { label: string; value: string }[];
	defaultValue?: string;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="space-y-2 flex flex-col">
			<Label className="flex flex-col" onClick={() => setOpen(true)}>
				{label}
				<small className="text-muted-foreground">{description}</small>
			</Label>
			<Select
				open={open}
				onOpenChange={setOpen}
				name={name}
				required={required}
				defaultValue={defaultValue}
			>
				<SelectTrigger>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
