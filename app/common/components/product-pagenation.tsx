import { useSearchParams } from "react-router";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "~/common/components/ui/pagination";

type ProductPagenationProps = {
	totalPages: number;
};

export function ProductPagenation({ totalPages }: ProductPagenationProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = Number(searchParams.get("page") ?? 1);
	// const onClick = (page: number) => {
	// 	searchParams.set("page", page.toString());
	// 	setSearchParams(searchParams, {
	// 		preventScrollReset: true,
	// 	});
	// };

	const getUrlWithPage = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", page.toString());
		return `?${params.toString()}`;
	};

	return (
		<Pagination>
			<PaginationContent>
				{page === 1 ? null : (
					<>
						<PaginationItem>
							<PaginationPrevious to={getUrlWithPage(page - 1)} />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink to={getUrlWithPage(page - 1)}>
								{page - 1}
							</PaginationLink>
						</PaginationItem>
					</>
				)}
				<PaginationItem>
					<PaginationLink to="#" isActive>
						{page}
					</PaginationLink>
				</PaginationItem>
				{page === totalPages ? null : (
					<>
						<PaginationItem>
							<PaginationLink to={getUrlWithPage(page + 1)}>
								{page + 1}
							</PaginationLink>
						</PaginationItem>
						{page + 1 === totalPages ? null : (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						)}
						<PaginationItem>
							<PaginationNext to={getUrlWithPage(page + 1)} />
						</PaginationItem>
					</>
				)}
			</PaginationContent>
		</Pagination>
	);
}
