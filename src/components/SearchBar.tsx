import type { ChangeEvent } from "react";

interface SearchBarProps {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ onChange }: SearchBarProps) {
	return (
		<div style={{ marginBottom: "20px" }}>
			<input
				type="text"
				placeholder="Search..."
				onChange={onChange}
				style={{
					padding: "10px",
					width: "100%",
					maxWidth: "400px",
					border: "1px solid #ccc",
					borderRadius: "5px",
				}}
			/>
		</div>
	);
}
